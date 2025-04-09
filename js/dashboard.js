// Inisialisasi Firebase (v9+ dengan modul)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD56P06t7d_P9ct7Ym1L8KNDvsfvMTQdp8",
    authDomain: "informasippdb-a32b5.firebaseapp.com",
    databaseURL: "https://informasippdb-a32b5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "informasippdb-a32b5",
    storageBucket: "gs://informasippdb-a32b5.appspot.com",
    messagingSenderId: "298339506279",
    appId: "1:298339506279:web:6a32dbbc7237faea6b9cc2",
    measurementId: "G-TKWCD0N90E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ambil NIS dari localStorage
const nis = localStorage.getItem('nis');

// Periksa jika NIS ada di localStorage dan panggil fungsi displayDataFromFirebase
if (nis) {
    // Jika NIS ada di localStorage, cari data di Firebase Realtime Database
    displayDataFromFirebase(nis);  // Panggil fungsi displayDataFromFirebase() dengan NIS yang ada
} else {
    alert("NIS tidak ditemukan di localStorage.");
}

// Fungsi untuk membaca data dari Firebase berdasarkan NIS yang ada di localStorage
function displayDataFromFirebase(nis) {
    if (!nis) {
        console.log("NIS tidak ditemukan.");
        return; // Keluar jika NIS tidak ada
    }

    const siswaRef = ref(db, 'userweb/' + nis); // Referensi ke node siswa dan NIS

    // Query data berdasarkan NIS
    get(siswaRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const siswa = snapshot.val();

                // Menampilkan data siswa di halaman
                document.getElementById('nama').innerText = siswa.name || 'Tidak tersedia';
                document.getElementById('agama').innerText = siswa.agama || 'Tidak tersedia';
                document.getElementById('alamat').innerText = `${siswa.alamat.Kecamatan}, ${siswa.alamat.Kelurahan}, RT ${siswa.alamat.RT}, RW ${siswa.alamat.RW}` || 'Tidak tersedia';
                document.getElementById('ipa').innerText = siswa.nilai.IPA || 'Tidak tersedia';
                document.getElementById('matematika').innerText = siswa.nilai.Matematika || 'Tidak tersedia';
                document.getElementById('inggris').innerText = siswa.nilai.Inggris || 'Tidak tersedia';
                document.getElementById('indonesia').innerText = siswa.nilai.Indonesia || 'Tidak tersedia'; // Tambahkan ini
                document.getElementById('nohp').innerText = siswa.nohp || 'Tidak tersedia';
            } else {
                console.log("Data dengan NIS ini tidak ditemukan.");
                document.body.innerHTML += `<p style="color: red;">Data dengan NIS ini tidak ditemukan di Firebase.</p>`;
            }
        })
        .catch((error) => {
            console.error("Error membaca data:", error);
            document.body.innerHTML += `<p style="color: red;">Terjadi kesalahan saat membaca data: ${error.message}</p>`;
        });
}
