function Tambah() {
    let bilangan1 = Number(document.getElementById("Bilangan1").value);
    let bilangan2 = Number(document.getElementById("Bilangan2").value);
    document.getElementById("hasil").value = bilangan1 + bilangan2;
}

function Kurang() {
    let bilangan1 = Number(document.getElementById("Bilangan 1").value);
    let bilangan2 = Number(document.getElementById("Bilangan 2").value);
    document.getElementById("hasil").value  = bilangan1 - bilangan2;
}

function Kali() {
    let bilangan1 = Number(document.getElementById("Bilangan 1").value);
    let bilangan2 = Number(document.getElementById("Bilangan 2").value);
    document.getElementById("hasil").value = bilangan1 * bilangan2;
}

function Bagi() {
    let bilangan1 = Number(document.getElementById("Bilangan 1").value);
    let bilangan2 = Number(document.getElementById("Bilangan 2").value);
    document.getElementById("hasil").value = bilangan1 / bilangan2;
}

function Modulus() {
    let bilangan1 = Number(document.getElementById("Bilangan 1").value);
    let bilangan2 = Number(document.getElementById("Bilangan 2").value);
    document.getElementById("hasil").value = bilangan1 % bilangan2;
}

function HapusHasil() {
    document.getElementById("hasil").value = 0;
}