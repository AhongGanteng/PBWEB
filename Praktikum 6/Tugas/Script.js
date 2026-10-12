//OptionGrup untuk Fakultas
const daftarFakultas = [
    {
        nama: "Fakultas Keguruan dan Ilmu Pendidikan",
        prodi: [
            { value: "pgsd", teks: "S1 - Pendidikan Guru Sekolah Dasar - Unggul" },
            { value: "bimbingan-konseling", teks: "S1 - Bimbingan dan Konseling - Unggul" },
            { value: "pendidikan-bahasa-inggris", teks: "S1 - Pendidikan Bahasa Inggris - Unggul" },
            { value: "pbsid", teks: "S1 - Pendidikan Bahasa, Sastra Indonesia dan Daerah - Unggul" },
            { value: "pendidikan-sejarah", teks: "S1 - Pendidikan Sejarah - Unggul" },
            { value: "pendidikan-ekonomi", teks: "S1 - Pendidikan Ekonomi - Unggul" },
            { value: "pendidikan-akuntansi", teks: "S1 - Pendidikan Akuntansi - Unggul" },
            { value: "pendidikan-matematika", teks: "S1 - Pendidikan Matematika - Unggul" },
            { value: "pendidikan-fisika", teks: "S1 - Pendidikan Fisika - Unggul" },
            { value: "pendidikan-biologi", teks: "S1 - Pendidikan Biologi - Unggul" },
            { value: "pendidikan-agama-katolik", teks: "S1 - Pendidikan Agama Katolik - Unggul" },
            { value: "pendidikan-kimia", teks: "S1 - Pendidikan Kimia - Baik Sekali" }
        ]
    },
    {
        nama: "Fakultas Bisnis dan Ekonomi",
        prodi: [
            { value: "akuntansi", teks: "S1 - Akuntansi - Baik Sekali" },
            { value: "ekonomi", teks: "S1 - Ekonomi - Baik Sekali" },
            { value: "manajemen", teks: "S1 - Manajemen - Unggul" }
        ]
    },
    {
        nama: "Fakultas Sastra",
        prodi: [
            { value: "sastra-indonesia", teks: "S1 - Sastra Indonesia - Unggul" },
            { value: "sastra-inggris", teks: "S1 - Sastra Inggris - Unggul" },
            { value: "sejarah", teks: "S1 - Sejarah - Baik Sekali" }
        ]
    },
    {
        nama: "Fakultas Sains dan Teknologi",
        prodi: [
            { value: "informatika", teks: "S1 - Informatika - Unggul" },
            { value: "matematika", teks: "S1 - Matematika - Unggul" },
            { value: "teknik-mesin", teks: "S1 - Teknik Mesin - Baik Sekali" },
            { value: "teknik-elektro", teks: "S1 - Teknik Elektro - Baik Sekali" }
        ]
    },
    {
        nama: "Fakultas Farmasi",
        prodi: [
            { value: "farmasi", teks: "S1 - Farmasi - Unggul" }
        ]
    },
    {
        nama: "Fakultas Teologi",
        prodi: [
            { value: "filsafat-keilahian", teks: "S1 - Filsafat Keilahian - Unggul" }
        ]
    },
    {
        nama: "Fakultas Psikologi",
        prodi: [
            { value: "psikologi", teks: "S1 - Psikologi - Unggul" }
        ]
    },
    {
        nama: "Fakultas Vokasi",
        prodi: [
            { value: "mekatronika", teks: "STr - Teknologi Rekayasa Mekatronika - Baik Sekali" },
            { value: "elektromedis", teks: "D3 - Teknologi Elektromedis - Baik Sekali" }
        ]
    }
];

const semuaPilihanProdi = document.querySelectorAll(".pilihan-prodi");
for (const pilihanProdi of semuaPilihanProdi) {
    for (const fakultas of daftarFakultas) {
        const kumpulanProdi = document.createElement("optgroup")
        kumpulanProdi.label = fakultas.nama;

        for (const prodi of fakultas.prodi) {
            const option = document.createElement("option");
            option.value = prodi.value;
            option.textContent = prodi.teks;
            kumpulanProdi.appendChild(option);
        }
        pilihanProdi.appendChild(kumpulanProdi);
    }
}

//OptionGrup untuk Agama
const daftarAgama = [
    {
        agama: "Katolik"
    },
    {
        agama: "Kristen"
    },
    {
        agama: "Islam"
    },
    {
        agama: "Hindu"
    },
    {
        agama: "Buddha"
    },
    {
        agama: "Lain-lain"
    }
];

const semuaPilihanAgama = document.querySelectorAll(".kumpulan-agama");
for (const pilihanAgama of semuaPilihanAgama) {
    for (const dataAgama of daftarAgama) {
        const option = document.createElement("option");
        option.value = dataAgama.agama;
        option.textContent = dataAgama.agama;
        pilihanAgama.appendChild(option);
    }
}

//OptionGrup untuk Tingkat pendidikan
const daftarTingkatPendidikan = [
    {
        pendidikan: "Tidak Lulus SD"
    },
    {
        pendidikan: "SD"
    },
    {
        pendidikan: "SMP"
    },
    {
        pendidikan: "SMA"
    },
    {
        pendidikan: "Diploma"
    },
    {
        pendidikan: "Sarjana"
    }, 
    {
        pendidikan: "Sarjana Muda"
    },
    {
        pendidikan: "Magister"
    }, 
    {
        pendidikan: "Doktor"
    },
    {
        pendidikan: "Profesor"
    }
];

const daftarPendidikan = document.querySelectorAll(".kumpulan-pendidikan");
for (const pilihanPendidikan of daftarPendidikan) {
    for (const dataPendidikan of daftarTingkatPendidikan) {
        const option = document.createElement("option");
        option.value = dataPendidikan.pendidikan;
        option.textContent = dataPendidikan.pendidikan;
        pilihanPendidikan.appendChild(option);
    }
}

//OptionGrup untuk Status
const daftarStatus = [
    {
        status: "Menikah"
    },
    {
        status: "Belum Menikah"
    },
    {
        status: "Biarawan/Biarawati"
    }
];

const semuaStatus = document.querySelectorAll(".kumpulan-status");
for (const pilihanStatus of semuaStatus) {
    for (const dataStatus of daftarStatus) {
        const option = document.createElement("option");
        option.value = dataStatus.status;
        option.textContent = dataStatus.status;
        pilihanStatus.appendChild(option);
    }
}

const formLogin = document.getElementById("form-login");
const inputKode = document.getElementById("kode-pembayaran");
if (formLogin && inputKode) {
    const kodePendaf = "123456789";

    inputKode.addEventListener("input", function () {
        inputKode.setCustomValidity("");
    });

    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const kodePengguna = inputKode.value.trim();

        if (kodePengguna === kodePendaf) {
            window.location.assign("FormPendafUSD.html");
        } else {
            inputKode.setCustomValidity("Kode pendaftaran salah!");
            inputKode.reportValidity();
        }
    });
}

const formPendaf = document.getElementById("form-pendaf");
if (formPendaf) {
    formPendaf.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.assign("PendafSelesai.html");
    });
}

const formSelesai = document.getElementById("form-selesai");
if (formSelesai) {
    formSelesai.addEventListener("submit", function(event) {
        event.preventDefault();
        window.location.assign("LoginFormulir.html");
    });
}

const radioTranfer = document.querySelectorAll("input[name='mhs-tranfer']");
const formDataMhsTranfer = document.getElementById("form-mhs-transfer");

radioTranfer.forEach(function(radio) {
    radio.addEventListener("change", function() {
        const tampil = (radio.value === "iya");
        formDataMhsTranfer.hidden = !tampil;
        formDataMhsTranfer.querySelector("input").required = tampil;
    });
});

const radioStatusMhsTranfer = document.querySelectorAll('input[name="status-mhs-transfer"]');
const statusMhsTranfer = document.getElementById("nilai-sudah-terakreditasi");

radioStatusMhsTranfer.forEach(function(radio) {
    radio.addEventListener("change", function() {
        const tampil = (radio.value === "sudah-terakreditasi");
        statusMhsTranfer.hidden = !tampil;
        statusMhsTranfer.querySelector("input").required = tampil;
    })
})