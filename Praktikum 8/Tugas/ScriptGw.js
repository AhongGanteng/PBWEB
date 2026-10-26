const dataPortofolio = [
    { 
        judul: "Web Profil Diri", isi: "Contoh: latihan HTML semantik dan CSS responsif." },
    { 
        judul: "Kalkulator Sederhana", isi: "Contoh: latihan JavaScript dan manipulasi DOM." }
];

const containerPortofolio = document.querySelector("#daftar-portofolio");
const formPortofolio = document.querySelector("#form-portofolio");
const errorPortofolio = document.querySelector("#error-portofolio");

function renderPortofolio() {
    containerPortofolio.textContent = "";
    dataPortofolio.forEach(function (data, indeks) {
        const artikel = document.createElement("article");
        artikel.dataset.indeks = indeks;
        const judul = document.createElement("h3");
        judul.textContent = data.judul;
        const isi = document.createElement("p");
        isi.textContent = data.isi;
        const hapus = document.createElement("button");
        hapus.textContent = "Hapus";
        hapus.classList.add("hapus-portofolio");
        hapus.setAttribute("type", "button");
        artikel.appendChild(judul);
        artikel.appendChild(isi);
        artikel.appendChild(hapus);
        containerPortofolio.appendChild(artikel);
    });
}
renderPortofolio();

formPortofolio.addEventListener("submit", function (event) {
    event.preventDefault();
    const judul = document.querySelector("#judul-portofolio").value.trim();
    const isi = document.querySelector("#isi-portofolio").value.trim();
    if (judul === "" || isi === "") {
        errorPortofolio.textContent = "Judul dan deskripsi portofolio wajib diisi.";
        return;
    }
    errorPortofolio.textContent = "";
    dataPortofolio.push({ judul: judul, isi: isi });
    renderPortofolio();
    formPortofolio.reset();
});

containerPortofolio.addEventListener("click", function (event) {
    if (event.target.matches("button.hapus-portofolio")) {
        const artikel = event.target.closest("article");
        const indeks = parseInt(artikel.dataset.indeks);
        dataPortofolio.splice(indeks, 1);
        renderPortofolio();
    }
});

const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorKomentar = document.querySelector("#error-komentar");

formKomentar.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.querySelector("#input-nama").value.trim();
    const pesan = document.querySelector("#input-pesan").value.trim();
    if (nama === "" || pesan === "") {
        errorKomentar.textContent = "Nama dan komentar wajib diisi.";
        return;
    }
    if (pesan.length < 5) {
        errorKomentar.textContent = "Komentar minimal 5 karakter.";
        return;
    }
    errorKomentar.textContent = "";
    const item = document.createElement("li");
    const teks = document.createElement("p");
    teks.textContent = nama + ": " + pesan;
    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.classList.add("hapus-komentar");
    hapus.setAttribute("type", "button");
    item.appendChild(teks);
    item.appendChild(hapus);
    daftarKomentar.appendChild(item);
    formKomentar.reset();
});

daftarKomentar.addEventListener("click", function (event) {
    if (event.target.matches("button.hapus-komentar")) {
        event.target.closest("li").remove();
    }
});

document.querySelector("#hapus-semua-komentar").addEventListener("click", function () {
    daftarKomentar.textContent = "";
});

const tombolTema = document.querySelector("#btn-tema");
tombolTema.addEventListener("click", function () {
    const gelap = document.body.classList.toggle("dark-mode");
    if (gelap) tombolTema.textContent = "Terang";
    else tombolTema.textContent = "Gelap";
});

const tombolAtas = document.querySelector("#kembali-atas");
function tampilkanTombolAtas() {
    if (window.scrollY > 300) tombolAtas.style.display = "block";
    else tombolAtas.style.display = "none";
}

window.addEventListener("scroll", tampilkanTombolAtas);
tombolAtas.addEventListener("click", function () {
    window.scrollTo(0, 0);
});
tampilkanTombolAtas();

const btnMenuHP = document.querySelector("#btn-menu");
const menuNav = document.querySelector("#menu-nav");
btnMenuHP.addEventListener("click", function () {
    const terbuka = menuNav.classList.toggle("terbuka");
    btnMenuHP.setAttribute("aria-expanded", terbuka);
});
menuNav.querySelectorAll("a").forEach(function (tautan) {
    tautan.addEventListener("click", function () {
        menuNav.classList.remove("terbuka");
        btnMenuHP.setAttribute("aria-expanded", "false");
    });
});

const tombolSosial = document.querySelector("#btn-sosial");
const daftarSosial = document.querySelector(".listMedSos");

tombolSosial.addEventListener("click", function () {
    const terbuka = daftarSosial.classList.toggle("terbuka");

    tombolSosial.setAttribute("aria-expanded", terbuka);
});