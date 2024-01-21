// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyA-to27z4qyYrUt_VHRztAZ2ld1qxxZV4g",
  authDomain: "qarebcom-sa.firebaseapp.com",
  projectId: "qarebcom-sa",
  storageBucket: "qarebcom-sa.appspot.com",
  messagingSenderId: "554635567198",
  appId: "1:554635567198:web:42ba423e7a09d4252514cf",
  measurementId: "G-84420XERJQ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
});
// =================================== new ==========================
