function validasi() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "" && password == "") {
        document.getElementById("hasil").innerHTML = "Username dan Password Tidak boleh Kosong"
    } else if (username.length != 6 || username == ""){
        document.getElementById("hasil").innerHTML = "Username harus 6 karakter";
    } else if (password.length < 6 || password == "" || password.length > 8) {
        document.getElementById("hasil").innerHTML = "Password harus 6-8 karakter";
    } else if (password == "BasisA" && username == "MHS001") {
        document.getElementById("hasil").innerHTML = "LOGIN BERHASIL!!!";
    } else if (password == "BasisA" && username != "MHS001") {
        document.getElementById("hasil").innerHTML = "USERNAME SALAH!!!";
    } else if (password != "BasisA" && username == "MHS001") {
        document.getElementById("hasil").innerHTML = "PASSWORD SALAH!!!";
    } else {
        document.getElementById("hasil").innerHTML = "LOGIN GAGAL!!!";
    }
}

function PWBaru() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("passwordBaru").value;
    let passwordval = document.getElementById("ulangPassword").value;

    if (username == "" || password == "") {
        document.getElementById("hasil").innerHTML = "Username dan Password Tidak boleh Kosong"
    }  else if (username.length < 6 || username == "" || username > 8){
        document.getElementById("hasil").innerHTML = "Username harus 6-8 karakter";
    } else if (password.length < 8 || password == "") {
        document.getElementById("hasil").innerHTML = "Password harus 8 karakter";
    } 
    else if (username == "MHS001" && password === passwordval) {
        document.getElementById("hasil").innerHTML = "Password Berhasil Diubah!!!"
    }
}