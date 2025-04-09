document.addEventListener("DOMContentLoaded", function () {
    const nis = localStorage.getItem("nis");
    const role = localStorage.getItem("role");

    // Ambil elemen menu dan opsi login/logout
    const desktopMenu = document.getElementById("desktopMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const loginOption = document.getElementById("loginOption");
    const registerOption = document.getElementById("registerOption");
    const dashboardOption = document.getElementById("dashboardOption");
    const logoutOption = document.getElementById("logoutOption");

    const loginOptionMobile = document.getElementById("loginOptionMobile");
    const registerOptionMobile = document.getElementById("registerOptionMobile");
    const dashboardOptionMobile = document.getElementById("dashboardOptionMobile");
    const logoutOptionMobile = document.getElementById("logoutOptionMobile");

    const hamburger = document.getElementById("hamburger");
    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");

    // Tampilkan opsi yang sesuai berdasarkan apakah user sudah login
    if (nis) {
        dashboardOption.classList.remove("hidden");
        logoutOption.classList.remove("hidden");
        loginOption.classList.add("hidden");
        registerOption.classList.add("hidden");

        dashboardOptionMobile.classList.remove("hidden");
        logoutOptionMobile.classList.remove("hidden");
        loginOptionMobile.classList.add("hidden");
        registerOptionMobile.classList.add("hidden");

        // Jika role adalah admin, ubah teks Dashboard menjadi Admin Page
        if (role === "admin") {
            dashboardOption.innerText = "Admin Page";
            dashboardOption.href = "admin.html";

            dashboardOptionMobile.innerText = "Admin Page";
            dashboardOptionMobile.href = "admin.html";
        }
    } else {
        // Jika belum login, sembunyikan Dashboard & Logout
        dashboardOption.classList.add("hidden");
        logoutOption.classList.add("hidden");

        dashboardOptionMobile.classList.add("hidden");
        logoutOptionMobile.classList.add("hidden");
    }

    // Event listener untuk toggle menu mobile
    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("scale-100");
        mobileMenu.classList.toggle("opacity-100");

        // Animasi hamburger menjadi X
        bar1.classList.toggle("rotate-45");
        bar1.classList.toggle("translate-y-2");
        bar2.classList.toggle("opacity-0");
        bar3.classList.toggle("-rotate-45");
        bar3.classList.toggle("-translate-y-2");
    });

    // Fungsi logout
    window.logout = function () {
        localStorage.clear(); // Hapus semua item di localStorage
        alert("Logout berhasil!");
        window.location.reload();
    };

    // Klik di luar menu untuk menutup
    document.addEventListener("click", function (event) {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("scale-100");
            mobileMenu.classList.remove("opacity-100");
        }
    });

    // Cek ukuran layar untuk menampilkan/menyembunyikan menu desktop dan mobile
    function checkScreenSize() {
        if (window.innerWidth >= 768) {
            desktopMenu.classList.remove("hidden"); // Tampilkan menu desktop
            hamburger.classList.add("hidden"); // Sembunyikan hamburger
            mobileMenu.classList.add("hidden"); // Sembunyikan menu mobile jika di desktop
        } else {
            desktopMenu.classList.add("hidden"); // Sembunyikan menu desktop
            hamburger.classList.remove("hidden"); // Tampilkan hamburger
        }
    }

    // Jalankan saat resize layar
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Cek saat pertama kali halaman dimuat
});




//function daftar 
let selectedChoices = [];

function openModal(type) {
    const nis = localStorage.getItem("nis");
    if (!nis) {
        alert("Anda harus login terlebih dahulu untuk mendaftar!");
        window.location.href = "login.html";
        return;
    }

    let selectedMajor = type === "SMK" ? localStorage.getItem("selectedMajor") || "" : "";
    let searchQuery = localStorage.getItem("searchQuery") || "";

    const schools = {
        "SMA": [
            { name: "SMA Negeri 2 Surakarta", description: "Sekolah unggulan dengan program akademik dan ekstrakurikuler yang kuat.", majors: ["IPA", "IPS"], logo: "pic/SEKOLAHKITA.png" },
            { name: "SMA Negeri 3 Surakarta", description: "Sekolah berbasis kurikulum nasional dengan fokus pada pengembangan karakter.", majors: ["IPS"], logo: "pic/SEKOLAHKITA.png" },
            { name: "SMA Negeri 4 Surakarta", description: "Sekolah favorit dengan banyak prestasi akademik dan non-akademik.", majors: ["IPA", "IPS"], logo: "pic/SEKOLAHKITA.png" }
        ],
        "SMK": [
            { name: "SMK Negeri 4 Surakarta", description: "Menawarkan program keahlian di bidang bisnis dan teknologi.", majors: [ "RPL" ], logo: "pic/SEKOLAHKITA.png" },
            { name: "SMK Negeri 6 Surakarta", description: "Sekolah kejuruan dengan fokus pada akuntansi dan teknologi informasi.", majors: ["AKL", "RPL", "ULP"], logo: "pic/SEKOLAHKITA.png" },
            { name: "SMK Negeri 5 Surakarta", description: "Menghasilkan lulusan siap kerja dengan program keahlian unggulan.", majors: [ "RPL", "ULP"], logo: "pic/SEKOLAHKITA.png" },
            { name: "SMK Negeri 7 Surakarta", description: "Sekolah dengan fasilitas lengkap dan tenaga pengajar profesional.", majors: ["AKL","ULP"], logo: "pic/SEKOLAHKITA.png" }
        ]
    };

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <div class="p-6 w-4/5 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 class="text-xl font-bold mb-4 text-center">Pilih Sekolah ${type}</h2>

            <!-- Search Bar & Button -->
            <div class="flex gap-2 mb-4">
                <input type="text" id="searchSchool" placeholder="Cari sekolah..." 
                    class="w-full p-2 border rounded" value="${searchQuery}">
                <button id="searchButton" class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            <!-- Filter Jurusan -->
            ${type === "SMK" ? `
            <select id="majorFilter" class="w-full p-2 mb-4 border rounded">
                <option value="">Semua Jurusan</option>
                ${["RPL", "AKL", "ULP"].map(major => `
                    <option value="${major}" ${selectedMajor === major ? 'selected' : ''}>${major}</option>
                `).join('')}
            </select>` : ""}

            <!-- List Sekolah -->
            <div id="schoolList" class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
                ${renderSchoolList(schools[type], selectedMajor, searchQuery)}
            </div>
        </div>
    `;

    const modal = document.getElementById("modal");
    modal.classList.remove("opacity-0", "pointer-events-none");
    document.querySelector("#modal > div").classList.remove("translate-y-full");
    document.querySelector("#modal > div").classList.add("w-4/5", "max-w-2xl", "mx-auto");

    // Event Listener untuk Filter Jurusan
    if (type === "SMK") {
        document.getElementById("majorFilter").addEventListener("change", function () {
            localStorage.setItem("selectedMajor", this.value);
            openModal("SMK");
        });
    }

    // Event Listener untuk tombol Search
    document.getElementById("searchButton").addEventListener("click", function () {
        searchSchools(type);
    });

    // Event Listener untuk tombol Enter pada input pencarian
    document.getElementById("searchSchool").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchSchools(type);
        }
    });
}

// Fungsi untuk mencari sekolah
function searchSchools(type) {
    const searchValue = document.getElementById("searchSchool").value;
    localStorage.setItem("searchQuery", searchValue);
    openModal(type);
}

// Fungsi untuk merender daftar sekolah sesuai filter
function renderSchoolList(schools, selectedMajor, searchQuery) {
    return schools
        .filter(school => 
            (selectedMajor === "" || school.majors.includes(selectedMajor)) &&
            (searchQuery === "" || school.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .map(school => `
            <div class="border p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                <img src="${school.logo}" alt="${school.name}" class="w-16 h-16 mb-2 rounded-full shadow">
                <h3 class="font-semibold text-lg">${school.name}</h3>
                <p class="text-sm text-gray-600">${school.description}</p>
                <div class="mt-2">
                    ${school.majors.map(major => `
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" name="schoolChoice" value="${school.name} - ${major}" 
                                onclick="selectOption(this, '${school.name}', '${major}')" 
                                ${isSelected(school.name, major) ? 'checked' : ''} />
                            <span>${major}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
}


function isSelected(school, major) {
    return selectedChoices.some(choice => choice.school === school && choice.major === major);
}

function selectOption(checkbox, school, major) {
    const choice = { school, major };

    // Jika sudah dipilih, hapus dari daftar
    const index = selectedChoices.findIndex(item => item.school === school && item.major === major);
    if (index !== -1) {
        selectedChoices.splice(index, 1);
    } else {
        // Cek apakah sudah memilih 2 pilihan
        if (selectedChoices.length >= 2) {
            alert("Anda hanya bisa memilih maksimal 2 pilihan!");
            checkbox.checked = false; // **Batalkan checkbox jika lebih dari 2**
            return;
        }
        selectedChoices.push(choice);
    }

    console.log("Pilihan saat ini:", selectedChoices);
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("opacity-0", "pointer-events-none");
    document.querySelector("#modal > div").classList.add("translate-y-full");
}

function submitSelection() {
    const nis = localStorage.getItem("nis");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role"); // Ambil role dari localStorage
    const nilaiRata = localStorage.getItem("nilaiRata") || "0"; // Default 0 jika tidak ada

    if (!nis) {
        alert("Anda harus login terlebih dahulu!");
        window.location.href = "login.html";
        return;
    }

    if (selectedChoices.length < 1) {
        alert("Pilih minimal 1 sekolah dan jurusan sebelum mendaftar!");
        return;
    }

    if (selectedChoices.length > 2) {
        alert("Anda hanya bisa memilih maksimal 2 sekolah dan jurusan!");
        return;
    }

    console.log("🔍 Memeriksa apakah data dapat terkirim...");

    let hasError = false; // Untuk mengecek jika ada error saat simulasi penyimpanan

    selectedChoices.forEach(choice => {
        const path = `pendaftaran/${choice.school}/${choice.major}/${nis}`;

        // Data yang akan disimpan
        const data = {
            name: name,
            nilaiRata: nilaiRata
        };

        if (role === "admin") {
            // Hanya mencetak simulasi tanpa menyimpan
            console.log(`🛑 [SIMULASI] Data akan dikirim ke ${path}:`, data);
        } else {
            // Menyimpan data jika bukan admin
            firebaseSet(path, data)
                .then(() => {
                    console.log(`✅ Data berhasil disimpan di ${path}`, data);
                })
                .catch(error => {
                    console.error(`❌ Gagal menyimpan data di ${path}:`, error);
                    hasError = true;
                });
        }
    });

    if (role === "admin") {
        alert("Data Berhasil Terkrim tidak ada eror.");
    } else {
        if (!hasError) {
            alert("Pendaftaran berhasil!");
        } else {
            alert("Terjadi kesalahan saat mengirim data, periksa kembali.");
        }
    }

    closeModal();
}


//Slider
let currentIndex = 0;
    const slides = document.getElementById("slides");
    const totalSlides = slides.children.length;
    const dots = document.querySelectorAll(".dot");

    function updateSlide() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("bg-blue-700", index === currentIndex);
            dot.classList.toggle("bg-gray-400", index !== currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
    }

    document.getElementById("nextSlide").addEventListener("click", nextSlide);
    document.getElementById("prevSlide").addEventListener("click", prevSlide);

    // Klik titik untuk berpindah slide
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlide();
        });
    });

    // Auto-slide setiap 3 detik
    setInterval(nextSlide, 3000);

    // Set warna titik pertama saat pertama kali load
    updateDots();


