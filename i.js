const admin = require("firebase-admin");

// Import Service Account Key
const serviceAccount = require("./informasippdb-a32b5-firebase-adminsdk-dka9u-28500e4d2d.json");

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://informasippdb-a32b5-default-rtdb.asia-southeast1.firebasedatabase.app/" // Ganti dengan Database URL Anda
});

// Tes akses ke Firebase
const db = admin.database();
db.ref("test-path").set({ message: "Hello, Firebase!" })
  .then(() => console.log("Data berhasil ditulis"))
  .catch(error => console.error("Error:", error));
