// script.js

// Menangani klik pada pilihan SMA
document.getElementById("sma-option").addEventListener("click", function() {
    showSchools("SMA");
});

// Menangani klik pada pilihan SMK
document.getElementById("smk-option").addEventListener("click", function() {
    showSchools("SMK");
});

// Fungsi untuk menampilkan sekolah berdasarkan jenis (SMA atau SMK)
function showSchools(type) {
    const schoolList = document.getElementById("school-list");
    const closeButton = document.getElementById("close-button");

    schoolList.classList.remove("show");  // Menghapus kelas show untuk animasi keluar

    // Reset konten sekolah sebelum muncul kembali
    setTimeout(function() {
        schoolList.innerHTML = "";  // Reset daftar sekolah yang muncul

        // Menampilkan daftar sekolah dan jurusan berdasarkan pilihan
        if (type === "SMA") {
            schoolList.innerHTML = `
                <h2>Pilih SMA</h2>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMA Negeri 2"><p>SMA Negeri 2</p>
                    <button onclick="confirmJurusan('SMA', 'IPA')">Pilih IPA</button>
                    <button onclick="confirmJurusan('SMA', 'IPS')">Pilih IPS</button>
                </div>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMA Negeri 3"><p>SMA Negeri 3</p>
                    <button onclick="confirmJurusan('SMA', 'IPA')">Pilih IPA</button>
                    <button onclick="confirmJurusan('SMA', 'IPS')">Pilih IPS</button>
                </div>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMA Batik"><p>SMA Batik</p>
                    <button onclick="confirmJurusan('SMA', 'IPA')">Pilih IPA</button>
                    <button onclick="confirmJurusan('SMA', 'IPS')">Pilih IPS</button>
                </div>
            `;
        } else if (type === "SMK") {
            schoolList.innerHTML = `
                <h2>Pilih SMK</h2>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMK Negeri 4"><p>SMK Negeri 4</p>
                    <button onclick="confirmJurusan('SMK', 'AKL')">Pilih AKL</button>
                    <button onclick="confirmJurusan('SMK', 'RPL')">Pilih RPL</button>
                    <button onclick="confirmJurusan('SMK', 'ULP')">Pilih ULP</button>
                </div>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMK Negeri 5"><p>SMK Negeri 5</p>
                    <button onclick="confirmJurusan('SMK', 'AKL')">Pilih AKL</button>
                    <button onclick="confirmJurusan('SMK', 'RPL')">Pilih RPL</button>
                    <button onclick="confirmJurusan('SMK', 'ULP')">Pilih ULP</button>
                </div>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMK Negeri 6"><p>SMK Negeri 6</p>
                    <button onclick="confirmJurusan('SMK', 'AKL')">Pilih AKL</button>
                    <button onclick="confirmJurusan('SMK', 'RPL')">Pilih RPL</button>
                    <button onclick="confirmJurusan('SMK', 'ULP')">Pilih ULP</button>
                </div>
                <div class="school-item">
                    <img src="pic/snpmb.png" alt="SMK Negeri 7"><p>SMK Negeri 7</p>
                    <button onclick="confirmJurusan('SMK', 'AKL')">Pilih AKL</button>
                    <button onclick="confirmJurusan('SMK', 'RPL')">Pilih RPL</button>
                    <button onclick="confirmJurusan('SMK', 'ULP')">Pilih ULP</button>
                </div>
            `;
        }

        // Menambahkan kelas show untuk animasi masuk (slide kebawah)
        schoolList.classList.add("show");
        closeButton.style.display = "inline-block";  // Menampilkan tombol tutup
    }, 500);  // Delay untuk memastikan animasi keluar selesai sebelum mengganti konten
}

// Menangani klik pada tombol tutup untuk menyembunyikan daftar sekolah
document.getElementById("close-button").addEventListener("click", function() {
    const schoolList = document.getElementById("school-list");
    schoolList.classList.remove("show");  // Menghapus kelas show untuk animasi keluar

    // Setelah animasi keluar, sembunyikan tombol tutup dan reset daftar sekolah
    setTimeout(function() {
        schoolList.innerHTML = "";  // Hapus daftar sekolah
        document.getElementById("close-button").style.display = "none";  // Sembunyikan tombol tutup
    }, 500);  // Delay untuk animasi slide ke atas
});

// Menampilkan alert untuk konfirmasi jurusan
function confirmJurusan(sekolah, jurusan) {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = alertBox.querySelector("p");
    alertMessage.textContent = `Anda ingin memilih jurusan ${jurusan} di ${sekolah}?`;

    alertBox.style.display = "flex";  // Menampilkan alert box
}

// Menangani konfirmasi atau pembatalan
document.getElementById("confirm-btn").addEventListener("click", function() {
    document.getElementById("alert-box").style.display = "none";  // Menutup alert box

    // Menampilkan alert sukses
    const successAlert = document.getElementById("success-alert");
    successAlert.style.display = "flex";  // Menampilkan alert sukses

    // Hilangkan alert sukses setelah beberapa detik
    setTimeout(function() {
        successAlert.style.display = "none";  // Menutup alert sukses
    }, 2000);  // Menutup alert setelah 2 detik
});

document.getElementById("cancel-btn").addEventListener("click", function() {
    document.getElementById("alert-box").style.display = "none";  // Menutup alert box
});
