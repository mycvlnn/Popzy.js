const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {
    this.openModal = function (content) {
        // Create element
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";

        const container = document.createElement("div");
        container.className = "modal-container";

        const closeBtn = document.createElement("button");
        closeBtn.className = "modal-close";
        closeBtn.innerHTML = "&times;";

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        // Append content and elements
        modalContent.innerHTML = content;
        container.append(closeBtn, modalContent);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add("show");
        }, 0);

        // Attach events
        closeBtn.onclick = () => {
            this.closeModal(backdrop);
        };

        backdrop.onclick = (e) => {
            if (e.target === backdrop) {
                this.closeModal(backdrop);
            }
        };

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
                document.removeEventListener("keydown", onKeyDown);
            }
        };

        document.addEventListener("keydown", onKeyDown);
    };

    this.closeModal = function (modalElement) {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = function () {
            modalElement.remove();
        };
    };
}

const modal = new Modal();

// modal.openModal("<h1>Hello F8</h1>");

$("#modal-btn-1").onclick = function () {
    modal.openModal("<h1>Hello guys</h1>");
};

$("#modal-btn-2").onclick = function () {
    modal.openModal("<h1>Hello guys 2</h1>");
};
