const admin = require("firebase-admin");
const serviceAccount = require("backend\\src\\  chess-e3600-firebase-adminsdk-ckjup-4e265a5600.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-e3600-default-rtdb.firebaseio.com",
});

// Now you can use various Firebase services, e.g., Firestore, Authentication, etc.
export const db = admin.firestore();
const auth = admin.auth();
