const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Popzy.elements = [];

Popzy.prototype._createButton = function (text, className, onClick) {
    const button = document.createElement("button");
    button.className = className;
    button.innerHTML = text;
    button.onclick = onClick;
    return button;
};

// Xử lý tối ưu dùng chung cho tất cả modal
Popzy.prototype._getScrollbarWidth = function () {
    // Kiểm tra trước đó đã tính toán rồi thì trả về giá trị đã tính
    if (this._scrollbarWidth) return this._scrollbarWidth;
    const div = document.createElement("div");
    Object.assign(div.style, {
        position: "fixed",
        top: "-999px",
        overflow: "scroll",
    });

    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    this._scrollbarWidth = width;
    document.body.removeChild(div);
    return width;
};

Popzy.prototype._buildModal = function () {
    // Create backdrop
    this._backdrop = document.createElement("div");
    this._backdrop.className = "popzy__backdrop";

    // Create container
    const container = document.createElement("div");
    container.className = "popzy__container";

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.className = "popzy__content";

    // Append content and elements
    const templateCloned = this._template.content.cloneNode(true);
    modalContent.append(templateCloned);

    // Thêm close button vào modal content
    if (this._allowButtonClose) {
        const closeBtn = this._createButton("&times;", "popzy__close", () => this.close());
        modalContent.append(closeBtn);
    }

    container.append(modalContent);

    // Chèn footer vào modal
    if (this._options.footer) {
        this._footerModal = document.createElement("div");
        this._footerModal.className = "popzy_footer";
        this._renderFooterContent();
        this._renderFooterButtons();
        container.append(this._footerModal);
    }

    // Chèn header vào modal
    if (this._options.header) {
        this._headerModal = document.createElement("div");
        this._headerModal.className = "popzy_header";
        this._renderHeaderContent();
        container.prepend(this._headerModal);
    }

    container.classList.add(...this._options.cssClassContainer);
    this._backdrop.classList.add(...this._options.cssClassBackdrop);
    this._backdrop.append(container);
    document.body.append(this._backdrop);
};

Popzy.prototype._ontransitionend = function (callback) {
    this._backdrop.ontransitionend = (event) => {
        if (event.propertyName !== "opacity") return;

        if (typeof callback === "function") callback();
    };
};

Popzy.prototype._handleEscapeKeyOuter = function (e) {
    console.log(this === Popzy.elements[Popzy.elements.length - 1]);
    if (this !== Popzy.elements[Popzy.elements.length - 1]) return;

    if (e.key === "Escape") {
        this.close();
    }
};

Popzy.prototype.open = function () {
    Popzy.elements.push(this);
    if (!this._backdrop) {
        this._buildModal();
    }

    setTimeout(() => {
        this._backdrop.classList.add("popzy--show");
    }, 0);

    // Thực hiện khoá cuộn của body
    document.body.classList.add("popzy--no-scroll");
    document.body.style.paddingRight = this._getScrollbarWidth() + "px";

    // Attach events
    if (this._allowEscapeClose) {
        document.addEventListener("keydown", this._handleEscapeKey);
    }

    if (this._allowBackdropClose) {
        // Xử lý sự kiện khi nhấn vào backdrop -> Đóng modal
        this._backdrop.onclick = (e) => {
            if (e.target === this._backdrop) {
                this.close();
            }
        };
    }

    this._ontransitionend(this._options.onOpen);

    return this._backdrop;
};

Popzy.prototype.close = function (destroy = this._options.destroyOnClose) {
    if (!this._backdrop) return; // Nếu trong trường hợp không có backdrop thì thôi không làm gì tránh lỗi

    Popzy.elements.pop();
    this._backdrop.classList.remove("popzy--show");
    document.removeEventListener("keydown", this._handleEscapeKey);

    this._ontransitionend(() => {
        if (destroy && this._backdrop) {
            this._backdrop.remove();
            this._backdrop = null;
            this._footerModal = null;
            this._headerModal = null;
        }
        // Thực hiện mở cuộn của body
        if (!Popzy.elements.length) {
            document.body.classList.remove("popzy--no-scroll");
            document.body.style.paddingRight = "";
        }
        if (typeof this._options.onClose === "function") this._options.onClose();
    });
};

Popzy.prototype.destroy = function () {
    if (this._backdrop) {
        this._backdrop.remove();
        this._backdrop = null;
    }
};

Popzy.prototype._renderHeaderContent = function () {
    if (this._headerModal && this._headerContent) {
        this._headerModal.innerHTML = this._headerContent;
    }
};

Popzy.prototype.setHeaderContent = function (content) {
    if (!this._options.header) return;
    this._headerContent = content;
    this._renderHeaderContent();
};

Popzy.prototype.setFooterContent = function (content) {
    if (!this._options.footer) return;
    this._footerContent = content;
    this._renderFooterContent();
};

Popzy.prototype._renderFooterContent = function () {
    if (this._footerModal && this._footerContent) {
        this._footerModal.innerHTML = this._footerContent;
    }
};

Popzy.prototype._renderFooterButtons = function () {
    this._footerActions.forEach((action) => {
        if (this._footerModal) {
            this._footerModal.append(action);
        }
    });
};

Popzy.prototype.addFooterButton = function (title, className, onClick) {
    if (!this._options.footer) return;
    const button = this._createButton(title, className, onClick);
    this._footerActions.push(button);
    this._renderFooterButtons();
};

function Popzy({
    templateId,
    cssClassContainer = [],
    cssClassBackdrop = [],
    closeMethods = ["button", "backdrop", "esc"],
    onOpen = function () {},
    onClose = function () {},
    footer = false,
    header = false,
    destroyOnClose = true,
}) {
    this._options = {
        templateId,
        cssClassContainer,
        cssClassBackdrop,
        closeMethods,
        onOpen,
        onClose,
        footer,
        header,
        destroyOnClose,
    };

    this._template = $(`#${this._options.templateId}`);
    if (!this._template) {
        console.error(`Template with id ${this._options.templateId} not found`);
        return;
    }
    this._allowBackdropClose = closeMethods.includes("backdrop");
    this._allowButtonClose = closeMethods.includes("button");
    this._allowEscapeClose = closeMethods.includes("esc");
    this._footerActions = [];
    this._handleEscapeKey = this._handleEscapeKeyOuter.bind(this);
}

const modal = new Popzy({
    templateId: "template-login",
    cssClassBackdrop: ["modal-1"],
    closeMethods: ["backdrop", "esc", "button"],
    onOpen: function () {
        console.log("Open modal");
    },
    onClose: function () {
        console.log("Close modal");
    },
    footer: true,
    header: true,
});

modal.setHeaderContent("Header content");

const modalLorem = new Popzy({
    templateId: "template-lorem",
    cssClassBackdrop: ["modal-2"],
    closeMethods: ["backdrop", "button", "esc"],
    onOpen: function () {
        console.log("Open modal");
    },
    onClose: function () {
        console.log("Close modal");
    },
    footer: true,
    header: true,
    destroyOnClose: false,
});

modalLorem.setHeaderContent("Header content");

modal.addFooterButton("OK", "btn btn-primary", function () {
    modalLorem.open();
});

modal.addFooterButton("<span>Huỷ bỏ</span>", "btn btn-danger", function () {
    console.log("Cancel");
    modal.close();
});

$("#modal-btn-1").onclick = function () {
    modal.open();
};

$("#modal-btn-2").onclick = function () {
    modalLorem.open();
};
