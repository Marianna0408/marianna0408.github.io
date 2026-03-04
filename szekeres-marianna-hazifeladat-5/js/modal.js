const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").innerText;
        const text = card.querySelector("p").innerText;

        modalTitle.innerText = title;
        modalText.innerText = text + " Részletes információért keressen minket bizalommal!";
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});