// App.jsx
import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );
  const [tokenStatus, setTokenStatus] = useState("initial");

  const VAPID_KEY ="BI6KtZZV4D34KvDGNWTiRWz0YaAjzwI-A53LlWBVxKJ6bJyeHkCagLTQhih_Nr4XL8SAZ6Xd646rmMCsLZ8vCGM";

  // ฟังก์ชันขอ token
 const getNotificationToken = async () => {
   try {
     setTokenStatus("waiting");
     const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
     if (currentToken) {
       console.log("Token received:", currentToken);
       setToken(currentToken);
       setTokenStatus("received");

       // หน่วงเวลา 1 วินาทีก่อน redirect
      //  setTimeout(() => {
      //    window.location.href = "https://abbott.in2it-service.com/";
      //  }, 2000);
     } else {
       console.log("No token received");
       setTokenStatus("failed");
     }
   } catch (err) {
     console.error("Error getting token:", err);
     setTokenStatus("failed");
   }
 };

  // ฟังก์ชันขอสิทธิ์
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === "granted") {
        await getNotificationToken();
      } else {
        setTokenStatus("failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setTokenStatus("failed");
    }
  };

  // เช็คสถานะตอนโหลดหน้า
  useEffect(() => {
    if (notificationPermission === "granted") {
      getNotificationToken();
    }
  }, []);

  // รับ notification
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "https://firebasestorage.googleapis.com/v0/b/abbot-e2d4c.firebasestorage.app/o/FCMImages%2FBell.png?alt=media&token=aee80c08-a19c-4fd6-9f22-56313de8d601",
          tag: "notification",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const openOtherPWA = () => {
    window.location.href = "https://abbott.in2it-service.com/";
  };

  const getButtonText = () => {
    if (notificationPermission === "granted") {
      switch (tokenStatus) {
        case "waiting":
          return "Getting Device Token...";
        case "received":
          return "Notifications Ready";
        case "failed":
          return "Token Error - Try Again";
        default:
          return "Open Notifications";
      }
    }
    return "Open Notifications";
  };

  const getButtonClass = () => {
    if (notificationPermission === "granted") {
      switch (tokenStatus) {
        case "waiting":
          return "notification-btn loading";
        case "received":
          return "notification-btn enabled";
        case "failed":
          return "notification-btn error";
        default:
          return "notification-btn";
      }
    }
    return "notification-btn";
  };

  return (
    <div className="app">
      <div className="header"></div>
      <div className="container">
        <div className="content-card">
          <div className="bell-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/abbot-e2d4c.firebasestorage.app/o/FCMImages%2FBell.png?alt=media&token=aee80c08-a19c-4fd6-9f22-56313de8d601"
              alt="Notification Bell"
              className="bell-icon"
            />
          </div>

          <h1>Push Notifications</h1>
          <p>
            Receive Push notifications from our application on a semi regular
            basis.
          </p>

          <button
            className={getButtonClass()}
            onClick={requestNotificationPermission}
            disabled={tokenStatus === "waiting"}
          >
           
            {getButtonText()}
          </button> <button className="other-pwa-btn" onClick={openOtherPWA}>
              Go to APAC-KOM Web Appliction
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
