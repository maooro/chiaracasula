
//content discografia
const slides = document.querySelectorAll(".slide");
const contents = document.querySelectorAll(".content>div")
const content_1 = document.querySelector("#content-1");
const content_2 = document.querySelector("#content-2");
const content_3 = document.querySelector("#content-3");
const elements_to_watch = document.querySelectorAll(".watch");

const serv_utils = "assets/server/serv_utils.php";

//Mary leggeva le foto
const lyric_modal = document.querySelector(".lyric-modal");
const lyric_modal_title = document.querySelector(".lyric-modal-title");
const lyric_modal_body = document.querySelector(".lyric-modal-body");
const lyric_modal_quit = document.querySelector(".lyric-modal-quit");
const tracklist_container = document.querySelector(".tracklist-container");
const lyric_icons = document.querySelectorAll(".track-lyric-icon");
const play_icons = document.querySelectorAll(".track-play-icon");
const stop_icons = document.querySelectorAll(".track-stop-icon");
const demo_audio = document.querySelector(".track-demo");


const changeContent = (href) => {
    switch (href) {
        case "slide-1":
            contents.forEach(content => {
                content.classList.add("d-none");
            });
            content_1.classList.remove("d-none");
            break;
        case "slide-2":
            contents.forEach(content => {
                content.classList.add("d-none");
            });
            content_2.classList.remove("d-none");
            break;
        case "slide-3":
            contents.forEach(content => {
                content.classList.add("d-none");
            });
            content_3.classList.remove("d-none");
            break;
        default:
            console.log("");
            break;
    }
}

slides.forEach(slide => {
    slide.addEventListener("click", () => {
        let id = slide.id;
        changeContent(id);
    });
});

var callback = function (items) {
    items.forEach((item) => {
        if (item.isIntersecting) {
            changeContent(item.target.id);
        } else {
            item.target.classList.remove("in-page");
        }
    });
}

const observer = new IntersectionObserver(callback, { threshold: 0.5 });
elements_to_watch.forEach((element) => {
    observer.observe(element);
})

const showLyric = () => {
    tracklist_container.classList.remove("translateInX");
    tracklist_container.classList.add("translateOutX");
    setTimeout(() => {
        tracklist_container.classList.add("d-none");
    }, 300);
    setTimeout(() => {
        lyric_modal.classList.add("show");
    }, 200);
    setTimeout(() => {
        lyric_modal.classList.add("d-block");
    }, 100);
}

lyric_icons.forEach(icon => {
    icon.addEventListener("click", () => {
        //console.log(icon.id);
        //console.log(icon.id.replaceAll("_", " ").toUpperCase());
        lyric_modal_title.innerHTML = icon.id.replaceAll("_", " ").toUpperCase();
        const formData = new FormData();
        let json = { "ope": "lyric", "track": icon.id };
        let jsonString = JSON.stringify(json);
        console.log(jsonString);

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
                lyric_modal_body.innerHTML = response;
            })
        showLyric();
    })
});

const showStop = () => {
    console.log("showStop started");
    play_icons.forEach(play_icon => {
        play_icon.classList.add("d-none");
    });
    stop_icons.forEach(stop_icon => {
        stop_icon.classList.remove("d-none");
    });
}

const showPlay = () => {
    console.log("showPlay started");
    stop_icons.forEach(stop_icon => {
        stop_icon.classList.add("d-none");
    });
    play_icons.forEach(play_icon => {
        play_icon.classList.remove("d-none");
    });
}

play_icons.forEach(play_icon => {
    play_icon.addEventListener("click", () => {
        console.log(play_icon.id);
        demo_audio.setAttribute("src", "assets/media/discografia/demo/" + play_icon.id + ".mp3");
        demo_audio.load();
        setTimeout(() => {
            demo_audio.play();
            //showStop();
        }, 100);

    })
});

stop_icons.forEach(stop_icon => {
    stop_icon.addEventListener("click", () => {
        demo_audio.pause();
        showPlay();
    })
});

const hideLyric = () => {
    lyric_modal.classList.remove("d-block");
    tracklist_container.classList.remove("d-none");
    setTimeout(() => {
        lyric_modal.classList.remove("show");
        lyric_modal.classList.add("hide");
        tracklist_container.classList.remove("translateOutX");
        tracklist_container.classList.add("translateInX");
    }, 100);
}

lyric_modal_quit.addEventListener("click", () => {
    hideLyric();
});
