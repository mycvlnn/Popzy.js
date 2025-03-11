const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {
    const getScrollbarWidth = () => {
        // Kiểm tra trước đó đã tính toán rồi thì trả về giá trị đã tính
        if (getScrollbarWidth.value) return getScrollbarWidth.value;

        const div = document.createElement("div");
        Object.assign(div.style, {
            position: "fixed",
            top: "-999px",
            overflow: "scroll",
        });

        document.body.appendChild(div);
        const width = div.offsetWidth - div.clientWidth;
        getScrollbarWidth.value = width;
        document.body.removeChild(div);
        return width;
    };

    this.openModal = function ({ templateId, allowClose = true }) {
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
        const template = $(`#${templateId}`);
        if (template) {
            const templateCloned = template.content.cloneNode(true);
            modalContent.appendChild(templateCloned);
        }

        container.append(closeBtn, modalContent);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add("show");
        }, 0);

        // Thực hiện khoá cuộn của body
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = getScrollbarWidth() + "px";

        // Attach events
        closeBtn.onclick = () => {
            this.closeModal(backdrop);
        };

        backdrop.onclick = (e) => {
            if (e.target === backdrop && allowClose) {
                this.closeModal(backdrop);
            }
        };

        // Xử lý sự kiện khi nhấn phím ESC -> Đóng modal
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
                document.removeEventListener("keydown", onKeyDown);
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return backdrop;
    };

    this.closeModal = function (modalElement) {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = function () {
            modalElement.remove();
        };
        // Thực hiện mở cuộn của body
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "";
    };
}

const modal = new Modal();

$("#modal-btn-1").onclick = function () {
    const modalContent = modal.openModal({
        templateId: "template-login",
        allowClose: false,
    });

    const loginForm = modalContent.querySelector("#form-login");
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        const values = {
            email: loginForm.email.value,
            password: loginForm.password.value,
        };

        console.log({ values });

        modal.closeModal(modalContent);
    };
};
