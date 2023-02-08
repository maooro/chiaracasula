
const floating_contact = document.querySelector(".floating-contact");
const contact_form = document.querySelector(".contact-form");
const open_contact_form = document.querySelector(".bi-envelope-at");
const close_contact_form = document.querySelector(".bi-x-lg");
const mail_valid_feedback = document.querySelector(".valid-feedback");
const mail_invalid_feedback = document.querySelector(".invalid-feedback");
const invia_mail = document.querySelector(".btn-submit");

floating_contact.addEventListener("click", () => {
    contact_form.classList.toggle("show");
    setTimeout(() => contact_form.classList.toggle("hide"), 0);
    open_contact_form.classList.toggle("d-none");
    close_contact_form.classList.toggle("d-none");

})

contact_form.addEventListener("submit", (e) => {
    e.preventDefault();

    invia_mail.classList.add("disabled");

    let nome = document.getElementById("input-nome");
    let mail = document.getElementById("input-mail");
    let messaggio = document.getElementById("input-messaggio");

    const formData = new FormData();
    let json = { "ope": "mail", "nome": nome.value, "mail": mail.value, "messaggio": messaggio.value };
    let jsonString = JSON.stringify(json);
    //console.log(jsonString);

    formData.append('jsonString', jsonString);

    fetch(serv_utils, {
        method: 'POST',
        body: formData,
    }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text()
        }
        throw new Error(response.statusText)
    })
        .then(function (response) {
            //console.log(response);
            let ioname = response.indexOf("-1");
            let iomail = response.indexOf("-2");
            let iomessaggio = response.indexOf("-3");
            formValidation(nome, ioname);
            formValidation(mail, iomail);
            formValidation(messaggio, iomessaggio);
            if (response == "-4") {
                mail_invalid_feedback.classList.remove("hidden");
                setTimeout(() => mail_invalid_feedback.classList.add("hidden"), 3000);
            }
            if (response == "0") {
                mail_valid_feedback.classList.remove("hidden");
                setTimeout(() => mail_valid_feedback.classList.add("hidden"), 3000);
            }
            
            invia_mail.classList.remove("disabled");
        })
})

const formValidation = (element, index) => {
    if (index != "-1") {
        element.classList.add("invalid");
        element.addEventListener("click", () => {
            element.classList.remove("invalid");
        })
    }
}