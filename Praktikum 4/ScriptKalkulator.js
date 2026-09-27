let expression = "";

const hasil = document.getElementById("hasil");
//=========== FUNCTION INPUT ===========
function input(button) {
    let value = button.value;

    if (expression === "" && (value === "+" || 
        value === "/" || value ==="*")) {
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

//=========== FUNCTION HITUNG ===========

function hitung() {
    let angka = expression;
    let hasilPerhitungan = eval(angka);
    hasil.innerText = hasilPerhitungan;
    expression = hasilPerhitungan.toString();
}

//=========== FUNCTION C ===========

function hapusSemua() {
    expression = "";
    hasil.innerText = 0;
}

//=========== FUNCTION BACKSPACE ===========

function backspace() {
    expression = expression.slice(0, -1);
    if (expression === "") {
        hasil.innerText = "0";
    } else {
        hasil.innerText = expression;
    }
}