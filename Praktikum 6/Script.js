const form  = document.querySelector("#from-daftar");
const nama = document.querySelector("#nama");
const email = document.querySelector("#email");
const password = document.querySelector("#email");
const konfirmasiPassword = document.querySelector("#email");
const pesanNama = document.querySelector("#pesan-nama");
const pesanEmail = document.querySelector("#pesan-email");
const pesanPassword = document.querySelector("#pesan-password");
const pesanKonfPassword = document.querySelector("#pesan-conpassword");
const hasil = document.querySelector("#hasil");

let sudahPeriksa = false;

function periksaInput(input,  pesan) {
    let teks = "";

    if (input.validity.valueMissing) {
        teks = "Format harus di isi";
    } else if (input.validity.typeMisatch) {
        teks = "Format email salah";
    } else if (input.validity.tooShort) {
        teks = "Minimal " + input.minLength + " Karakter"
    } else if (input.validity.tooLong) {
        teks = "Minimal " + input.minLength + " Karakter"
    }

    const valid = input.checkValidity();
    pesan.textContent = teks;
    pesan.classList.toggle("error", !valid);
    pesan.classList.toggle("succes", valid);
}

function periksaForm() {
    const valid = nama.checkValidity() && email.checkValidity();

    if(!valid) {
        hasil.textContent = "Format from salah";
    } else {
        hasil.textContent = "Format from benar";
    }

    hasil.classList.toggle("error", !valid);
    hasil.classList.toggle("succes", valid);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    sudahPeriksa = true;
    perikasiInput(nama, pesanNama);
    periksaInput(email, pesanEmail);
    periksaInput(password, pesanPassword);
    periksaInput(konfirmasiPassword, pesanKonfPassword);
    periksaHasil();
});

nama.addEventListener("input", function() {
    perikasiInput(nama, pesanNama);
    if(sudahPeriksa) {
        periksaHasil();
    }
});

email.addEventListener("input", function() {
    perikasiInput(email, pesanEmail);
    if(sudahPeriksa) {
        periksaHasil();
    }
});

password.addEventListener("input", function() {
    perikasiInput(password, pesanPassword);
    if(sudahPeriksa) {
        periksaHasil();
    }
});

konfirmasiPassword.addEventListener("input", function() {
    perikasiInput(konfirmasiPassword, pesanKonfPassword);
    if(sudahPeriksa) {
        periksaHasil();
    }
});
