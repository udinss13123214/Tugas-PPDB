    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  
    // 🔹 Konfigurasi Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD56P06t7d_P9ct7Ym1L8KNDvsfvMTQdp8",
        authDomain: "informasippdb-a32b5.firebaseapp.com",
        databaseURL: "https://informasippdb-a32b5-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "informasippdb-a32b5",
        storageBucket: "informasippdb-a32b5.appspot.com",
        messagingSenderId: "298339506279",
        appId: "1:298339506279:web:6a32dbbc7237faea6b9cc2",
        measurementId: "G-TKWCD0N90E"
    };
  
    // 🔹 Inisialisasi Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // 🔹 Simpan ke `window` agar bisa diakses dari `index.js`
    window.firebaseDatabase = database;
    window.firebaseRef = (path) => ref(database, path);
    window.firebaseSet = (path, data) => set(ref(database, path), data);
    window.firebasePush = (path, data) => push(ref(database, path), data);
  
    console.log("✅ Firebase berhasil dimuat!");
