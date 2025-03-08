const modal = document.querySelector("#modal");
const modalBtn = document.querySelector("#open-modal");

modalBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
    if (e.target.id === "modal" || e.target.id === "close-modal") {
        modal.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
});
