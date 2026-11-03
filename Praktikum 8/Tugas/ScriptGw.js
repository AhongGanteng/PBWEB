/*===========================
    FUNCTION MUAT LOADING
  ===========================*/
function muatLoadingKomentar(sedangMemuat) {
    
    if (loading) {
        loading.style.display = sedangMemuat ? "flex" : "none";
    }
}

/* =========================================================
   SUPAYA MUNCUL LOADING + ELEMEN
   ========================================================= */
const BASE = "https://jsonplaceholder.typicode.com/comments";
const loading = document.querySelector("#loading-komentar");

async function ambilKomentarAPI() {
    if (loading) {
        loading.style.display = sedangMemuat ? "flex" : "none";
    }
    try{
        const response = await fetch(BASE + "?_limit=1");
        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }
        const dataKomentar = await response.json();
        const komentarAwal = dataKomentar.map((komentar) => ({
            nama: komentar.name,
            pesan: komentar.body
        }));

        if (localStorage.getItem("komentar") === null) {
            localStorage.setItem(
                "komentar",
                JSON.stringify(komentarAwal)
            );
        }

        muatKomentar();
    } catch (error) {
        errorKomentar.innerHTML =
            "<b>Gagal memuat komentar, silakan coba lagi nanti.</b>";
        console.error("Gagal mengambil data:", error);
    } finally {
        if (loading) {
            loading.style.display = sedangMemuat ? "flex" : "none";
        }
    }
}

/* =========================================================
   UNTUK TOMBOL PERGANTIAN TEMA
   ========================================================= */
const tombolTema = document.querySelector("#btn-tema");
function muatPreferensiTema() {
  const tema = localStorage.getItem("tema");
  if (tema === "dark") {
    document.body.classList.add("dark-mode");
    tombolTema.textContent = "Terang";
  }
}
if (tombolTema) {
    tombolTema.addEventListener("click", function () {
        const gelap = document.body.classList.toggle("dark-mode");
        if (gelap) tombolTema.textContent = "Terang";
        else tombolTema.textContent = "Gelap";
        localStorage.setItem("tema", gelap ? "dark" : "light");
    });
}
muatPreferensiTema();

/* =========================================================
   UNTUK TOMBOL SEMBUNYI ASIDE
   ========================================================= */
const tombolSembunyi = document.querySelector("#btn-jadwal");
const infaTambahan = document.querySelector("#info-tambahan");
if (infaTambahan && tombolSembunyi) {
    const statusTabel = localStorage.getItem("statusTabel");
    if (statusTabel === "sembunyi") {
        infaTambahan.classList.add("tersembunyi");
    } else if (statusTabel === "tampil") {
        infaTambahan.classList.remove("tersembunyi");
    }
    tombolSembunyi.addEventListener("click", () => {
        infaTambahan.classList.toggle("tersembunyi");
        const status = infaTambahan.classList.contains("tersembunyi") ? "sembunyi" : "tampil";
        localStorage.setItem("statusTabel", status); 
    });
}

/* =========================================================
   UNTUK PORTOFOLIO
   ========================================================= */
const containerPortofolio = document.querySelector("#daftar-portofolio");
const formPortofolio = document.querySelector("#form-portofolio");
const errorPortofolio = document.querySelector("#error-portofolio");
const inputJudulDraf = document.querySelector("#judul-portofolio");
const inputIsiDraf = document.querySelector("#isi-portofolio");
function simpanPortofolio(judul, isi) {
    const daftar = JSON.parse(localStorage.getItem("portofolio")) || [];
    daftar.push({ judul, isi });
    localStorage.setItem("portofolio", JSON.stringify(daftar));
}
function hapusPortofolio(indeks) {
    const daftar = JSON.parse(localStorage.getItem("portofolio")) || [];
    daftar.splice(indeks, 1);
    localStorage.setItem("portofolio", JSON.stringify(daftar));
    muatPortofolio();
}
function renderPortofolio(daftar) {
    containerPortofolio.textContent = "";
    daftar.forEach(function (data, indeks) {
        const artikel = document.createElement("article");
        artikel.dataset.indeks = indeks;
        const judul = document.createElement("h3");
        judul.textContent = data.judul;
        const isi = document.createElement("p");
        isi.textContent = data.isi ?? data.deskripsi ?? "";
        const hapus = document.createElement("button");
        hapus.textContent = "Hapus";
        hapus.classList.add("hapus-portofolio");
        hapus.type = "button";
        artikel.appendChild(judul);
        artikel.appendChild(isi);
        artikel.appendChild(hapus);
        containerPortofolio.appendChild(artikel);
    });
}
function muatPortofolio() {
    const daftar = JSON.parse(localStorage.getItem("portofolio")) || [];
    renderPortofolio(daftar);
}
function simpanDrafPortofolio() {
    const draf = {
        judul: inputJudulDraf.value,
        isi: inputIsiDraf.value
    };
    sessionStorage.setItem("drafPortofolio", JSON.stringify(draf));
}
function muatDrafPortofolio() {
    const draf = JSON.parse(sessionStorage.getItem("drafPortofolio"));
    if (draf) {
        inputJudulDraf.value = draf.judul;
        inputIsiDraf.value = draf.isi;
    }
}
if (formPortofolio && containerPortofolio) {
    formPortofolio.addEventListener("submit", function (event) {
        event.preventDefault();
        const judul = inputJudulDraf.value.trim();
        const isi = inputIsiDraf.value.trim();

        if (judul === "" || isi === "") {
            errorPortofolio.textContent =
                "Judul dan deskripsi portofolio wajib diisi.";
            return;
        }

        errorPortofolio.textContent = "";
        simpanPortofolio(judul, isi);
        muatPortofolio();
        formPortofolio.reset();
        sessionStorage.removeItem("drafPortofolio");
    });
    containerPortofolio.addEventListener("click", function (event) {
        if (event.target.matches("button.hapus-portofolio")) {
            const artikel = event.target.closest("article");
            const indeks = parseInt(artikel.dataset.indeks, 10);

            hapusPortofolio(indeks);
        }
    });
    inputJudulDraf.addEventListener("input", simpanDrafPortofolio);
    inputIsiDraf.addEventListener("input", simpanDrafPortofolio);
    muatPortofolio();
    muatDrafPortofolio();   
}

/* =========================================================
   UNTUK KOMENTAR
   ========================================================= */
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorKomentar = document.querySelector("#error-komentar");
const hapusSemuaKomen = document.querySelector("#hapus-semua-komentar");
const inputNamaDraf = document.querySelector("#input-nama");
const inputPesanDraf = document.querySelector("#input-pesan");

function simpanKomentar(nama, pesan) {
  const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
  daftar.push({ nama, pesan });
  localStorage.setItem("komentar", JSON.stringify(daftar));
}
function hapusKomentar(indeks) {
  const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
  daftar.splice(indeks, 1);
  localStorage.setItem("komentar", JSON.stringify(daftar));
  muatKomentar();
}
function buatItemKomentar(nama, pesan, indeks) {
    const item = document.createElement("li");
    const teks = document.createElement("p");
    teks.textContent = nama + ": " + pesan;
    const hapus = document.createElement("button");
    const edit = document.createElement("button");
    hapus.textContent = "Hapus";
    edit.textContent = "Edit";
    hapus.type = "button";
    edit.type = "button";
    hapus.classList.add("hapus-komentar");
    edit.classList.add("edit-komentar");
    hapus.dataset.indeks = indeks;
    edit.dataset.indeks = indeks;
    item.appendChild(teks);
    item.appendChild(hapus);
    item.appendChild(edit);
    daftarKomentar.appendChild(item);
}
async function kirimKomentar(nama, pesan) {
    const response = await fetch(
        BASE, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nama,
                body: pesan,
            })
        }
    );
    if (!response.ok) {
        throw new Error("Gagal mengirim komentar, status: " + response.status);
    }
    return await response.json();
}
function muatKomentar() {
  daftarKomentar.textContent = "";
  const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
  daftar.forEach((k, indeks) => {buatItemKomentar(k.nama, k.pesan, indeks) 
  });
}
function simpanDraf() {
  const draf = {
    nama: inputNamaDraf.value,
    pesan: inputPesanDraf.value
  };
  sessionStorage.setItem("drafKomentar", JSON.stringify(draf));
}
function muatDraf() {
  const draf = JSON.parse(sessionStorage.getItem("drafKomentar"));
  if (draf) {
    inputNamaDraf.value = draf.nama;
    inputPesanDraf.value = draf.pesan;
  }
}
if (formKomentar && daftarKomentar && hapusSemuaKomen) {
    formKomentar.addEventListener("submit", async function (event) {
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
        try {
            await kirimKomentar(nama, pesan);
            console.log("Komentar tersimpan di server, id:", hasil.id);
            errorKomentar.textContent = "";
            simpanKomentar(nama, pesan);
            muatKomentar();
            formKomentar.reset();
            sessionStorage.removeItem("drafKomentar");
        } catch (error) {
            errorKomentar.textContent = "Gagal memuat komentar";
            console.error(error);
        }
        
    });
    daftarKomentar.addEventListener("click", async (event) => {
        if(event.target.tagName == "BUTTON") {
            const li = event.target.closest("li");
            const id = li.dataset.id;
            try {
                const response = await fetch(
                    BASE + `/${id}`, {
                        method: "DELETE",
                    }
                );
                if (!response.ok) {
                    throw new Error("Status" + response.status)
                }
                li.remove();
            } catch (error) {
                alert("Gagal menghapus komentar dari server");
                console.error(error);
            } 
        }
    });
    hapusSemuaKomen.addEventListener("click", function () {
        localStorage.setItem("komentar", JSON.stringify([]));
        muatKomentar();
    });
    muatKomentar();
    muatDraf();
    ambilKomentarAPI();
    inputNamaDraf.addEventListener("input", simpanDraf);
    inputPesanDraf.addEventListener("input", simpanDraf);
}

/* =========================================================
   BUAT KEMBALI KE ATAS
   ========================================================= */
const tombolAtas = document.querySelector("#kembali-atas");
function tampilkanTombolAtas() {
    if (window.scrollY > 300) tombolAtas.style.display = "block";
    else tombolAtas.style.display = "none";
}
if (tombolAtas) {
    tombolAtas.addEventListener("click", function () {
        window.scrollTo(0, 0);
    });
    window.addEventListener("scroll", tampilkanTombolAtas);
    tampilkanTombolAtas();
}

/* =========================================================
   UNTUK NAVIGASI
   ========================================================= */
const btnMenuHP = document.querySelector("#btn-menu");
const menuNav = document.querySelector("#menu-nav");
if (btnMenuHP && menuNav) {
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
}
const tombolSosial = document.querySelector("#btn-sosial");
const daftarSosial = document.querySelector(".listMedSos");
if (tombolSosial && daftarSosial) {
    tombolSosial.addEventListener("click", function () {
        const terbuka = daftarSosial.classList.toggle("terbuka");
        tombolSosial.setAttribute("aria-expanded", terbuka);
    });
}

