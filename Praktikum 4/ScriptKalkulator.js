let expression = "";

const hasil = document.getElementById("hasil");

function input(button) {
    let value = button.value;

    if (expression === "" || value === "+" || 
        value === "/" || value ==="*") {
            return;
    }

    if (value === "+" || value === "-" || 
        value === "/" || value ==="*") {

        let operatorTerakhir = expression.slice(-1);

        if (operatorTerakhir === "+" || operatorTerakhir === "-" || 
            operatorTerakhir === "/" || operatorTerakhir ==="*") {
                expression = expression.slice(0, -1);
        }
    }
    expression += button.value
    hasil.innerText = expression;
}

function hitung() {
    let angka = expression;
    let hasilPerhitungan = eval(angka);
    hasil.innerText = expression;
    expression = hasilPerhitungan.toString();
}

function hapusSemua() {
    expression = "";
    hasil.innerText = 0;
}

function backspace() {

    expression = expression.slice(0, -1);

    if (expression === "") {

        hasil.innerText = "0";

    } else {

        hasil.innerText = expression;

    }

}