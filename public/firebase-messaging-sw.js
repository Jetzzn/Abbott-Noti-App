importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC5G5jICwXH7PPuOxwTD-DXUZ3UnxMjZ64",
  authDomain: "abbot-e2d4c.firebaseapp.com",
  projectId: "abbot-e2d4c",
  storageBucket: "abbot-e2d4c.firebasestorage.app",
  messagingSenderId: "262076126066",
  appId: "1:262076126066:web:f7cfe573a00eca064f83eb",
  measurementId: "G-TWEP15F5Y9",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationOptions = {
    body: payload.notification.body,
    tag: "notification",
  };

  return self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  );
});
