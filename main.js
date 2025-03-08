const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentModal = null;

$$("[data-modal]").forEach((modalBtn) => {
    modalBtn.onclick = function () {
        const modal = $(modalBtn.dataset.modal);
        if (modal) {
            modal.classList.add("show");
            currentModal = modal;
        }
    };
});

$$(".modal-close").forEach((modalClose) => {
    modalClose.onclick = function () {
        const modal = this.closest(".modal-backdrop");
        if (modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    };
});

$$(".modal-backdrop").forEach((modal) => {
    modal.onclick = function (e) {
        if (e.target === this) {
            this.classList.remove("show");
            currentModal = null;
        }
    };
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && currentModal) {
        currentModal.classList.remove("show");
        currentModal = null;
    }
});
