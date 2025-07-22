
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Initialize Firebase app in the service worker with your config
firebase.initializeApp({
  apiKey: "AIzaSyAv3r8-FXwd36S_ecoPLT4SgHXnJcJlBXM",
  authDomain: "tiger-new-01.firebaseapp.com",
  projectId: "tiger-new-01",
  storageBucket: "tiger-new-01.appspot.com",
  messagingSenderId: "1056647106417",
  appId: "1:1056647106417:web:db5165cc1f83634c1b70d0",
  measurementId: "G-8QNGY1W6TM"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

// Optional: Customize background message handler (when app is in background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/firebase-logo.png' // optional icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
