//firebase.js
import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA-to27z4qyYrUt_VHRztAZ2ld1qxxZV4g",
  authDomain: "qarebcom-sa.firebaseapp.com",
  projectId: "qarebcom-sa",
  storageBucket: "qarebcom-sa.appspot.com",
  messagingSenderId: "554635567198",
  appId: "1:554635567198:web:42ba423e7a09d4252514cf",
  measurementId: "G-84420XERJQ",
};

firebase.initializeApp(firebaseConfig);

navigator.serviceWorker
  .register("firebase-messaging-sw.js", {
    scope: "firebase-cloud-messaging-push-scope",
  })
  .then((registration) => {
    const messaging = firebase.messaging();
    messaging.useServiceWorker(registration);
  })
  .catch((err) => {
    console.log(err);
  });

export default firebase.messaging();
