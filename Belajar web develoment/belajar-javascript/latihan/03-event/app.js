"use strict";
const luar = document.querySelector("#luar");
const dalam = document.querySelector("#dalam");
const log = document.querySelector("#log");

function tulis(pesan) {
  const item = document.createElement("li");
  item.textContent = pesan;
  log.append(item);
  if (log.children.length > 18) log.firstElementChild.remove();
}

luar.addEventListener("click", event => {
  tulis(`1. Capture di luar; target=${event.target.id || event.target.tagName}; currentTarget=${event.currentTarget.id}`);
}, { capture: true });

dalam.addEventListener("click", event => {
  tulis(`2. Callback tombol; target=${event.target.id}; currentTarget=${event.currentTarget.id}`);
  if (document.querySelector("#stop").checked) {
    event.stopPropagation();
    tulis("   Propagation dihentikan. Capture yang sudah terjadi tidak dibatalkan.");
  }
});

luar.addEventListener("click", event => {
  tulis(`3. Bubbling di luar; target=${event.target.id || event.target.tagName}; currentTarget=${event.currentTarget.id}`);
});

document.querySelector("#tautan").addEventListener("click", event => {
  if (document.querySelector("#prevent").checked) event.preventDefault();
  tulis(`Tautan diaktifkan; defaultPrevented=${event.defaultPrevented}`);
});
document.querySelector("#bersihkan").addEventListener("click", () => log.replaceChildren());
