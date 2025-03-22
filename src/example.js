// Highlight code
hljs.initHighlightingOnLoad();

// Modal samples

// Basic Modal
const modal1Btn = document.querySelector(".js-popzy-modal-1");
const modal1 = new Popzy({
    content: `
          <h1>Basic Modal</h1>
          <p>This is a basic modal with a simple message. You can close it by clicking the overlay or the close button.</p>
      `,
    footer: true,
});

modal1Btn.onclick = () => {
    modal1.open();
};

// Modal with Buttons
const modal2Btn = document.querySelector(".js-popzy-modal-2");
const modal2 = new Popzy({
    content: `
          <h1>Modal with Buttons</h1>
          <p>This modal includes functional buttons for actions such as canceling or confirming.</p>
      `,
    footer: true,
});
modal2.addFooterButton("Cancel", "modal-btn", () => {
    modal2.close();
});
modal2.addFooterButton("Confirm", "modal-btn primary", () => {
    console.log("Action confirmed!");
    modal2.close();
});
modal2Btn.onclick = () => {
    modal2.open();
};

// Large Content Modal
const modal3Btn = document.querySelector(".js-popzy-modal-3");
const modal3 = new Popzy({
    content: `
          <h1>Large Content Modal</h1>
          <p>This modal contains a large amount of content, suitable for displaying extended text or information.</p>
          <p>Please scroll down to view the entire content.</p>
          <p>The content can include multiple paragraphs, images, or other detailed information.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil cumque adipisci mollitia voluptatibus explicabo non perspiciatis eaque sed qui. Est.</p>
      `,
});
modal3Btn.onclick = () => {
    modal3.open();
};

// Footer-Only Close Modal
const modal4Btn = document.querySelector(".js-popzy-modal-4");
const modal4 = new Popzy({
    content: `
          <h1>Footer-Only Close Modal</h1>
          <p>This modal can only be closed via the button in the footer for a controlled experience.</p>
      `,
    footer: true,
    closeMethods: [],
});
modal4.addFooterButton("Close", "modal-btn", () => {
    modal4.close();
});
modal4Btn.onclick = () => {
    modal4.open();
};

// Persistent Modal
const modal5Btn = document.querySelector(".js-popzy-modal-5");
const modal5 = new Popzy({
    content: `
          <h1>Persistent Modal</h1>
          <p>This modal stays in the DOM even after being closed, allowing you to reopen it without losing any changes.</p>
          <p>You can write something in the input below, close the modal, and reopen it to see the content still intact.</p>
          <input type="text" placeholder="Type something here..." class="modal-input" style="width: 100%; padding: 10px; margin-top: 10px;" />
      `,
    destroyOnClose: false,
});
modal5Btn.onclick = () => {
    modal5.open();
};

// Multiple Modals
const modal6Btn = document.querySelector(".js-popzy-modal-6");
const modal6 = new Popzy({
    content: `
          <h1>Multiple Modals</h1>
          <p>This modal demonstrates interaction between multiple modals. You can open another modal from here.</p>
          <button class="btn" onclick="modal1.open();">Open Basic Modal</button>
      `,
});

modal6Btn.onclick = () => {
    modal6.open();
};

// Youtube Embed Modal
const modal7Btn = document.querySelector(".js-popzy-modal-7");
const modal7 = new Popzy({
    content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RDfwGkasp58?si=g8qSqHld--Uimjme" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
});
modal7Btn.onclick = () => {
    modal7.open();
};

// Modal with form
const modal8Btn = document.querySelector(".js-popzy-modal-8");
const modal8 = new Popzy({
    templateId: "login-template",
});

modal8Btn.onclick = () => {
    const contentModal = modal8.open();
    const form = contentModal.querySelector("#form-login");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = form.querySelector("#username").value;
        const password = form.querySelector("#password").value;
        console.log("Username:", username);
        console.log("Password:", password);
        modal8.close();
    });
};

// Modal with header
const modal9 = new Popzy({
    templateId: "logout-template",
    closeMethods: ["backdrop", "esc", "button"],
    header: true,
    footer: true,
});

modal9.setHeaderContent(`<h1 class="logout-form__title">Logout</h1>`);
modal9.addFooterButton("No", "modal-btn", () => modal9.close());
modal9.addFooterButton("Yes", "modal-btn primary", () => modal9.close());

document.querySelector(".js-popzy-modal-9").onclick = () => modal9.open();
