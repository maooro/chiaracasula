const serv_utils = "assets/server/serv_utils.php";
const profile_descr_container = document.querySelector(".profile-descr-container");

const formData = new FormData();
let json = { "ope": "bio" };
let jsonString = JSON.stringify(json);
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
        profile_descr_container.innerHTML = response;
    })
