//firebase.js
import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCbi0FUJDBPITd2Pxfk15PjrpZZsMfmeGg",
  authDomain: "tlawaty.firebaseapp.com",
  projectId: "tlawaty",
  storageBucket: "tlawaty.appspot.com",
  messagingSenderId: "590592866685",
  appId: "1:590592866685:web:001583c81dab7ec96b3414",
  measurementId: "G-1QQLBF621W",
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
