let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let CVs;
//let allUsers;

let colors = {
    ["#HTML/CSS"]: "rgba(0, 112, 255, 1)",
    ["#JavaScript"]: "rgba(255, 149, 0, 1)",
    ["#React"]: "rgba(255, 4, 105, 1)",
    ["#Golang"]: "rgba(0, 255, 242, 1)",
    ["#Java"]: "rgba(255, 246, 0, 1)",
    ["#C/C#"]: "rgba(0, 255, 9, 1)",
    ["#C++"]: "rgba(255, 0, 0, 1)",
    ["#Web"]: "rgba(149, 255, 0, 1)",
    ["#UX/UI"]: "rgba(255, 0, 200, 1)"
}

function openWindow(link, executor) {
    if (checkRegister()) {
        window.location.href = `./auth.html?${executor}`;
        return;
    }
    window.open(link, '_self');
}

function checkRegister() {
    if (!currentUser) return 1;
    return 0;
}

async function trySign() {
    let [login, password] = document.querySelectorAll("input");
    const caption = document.querySelector(".user-hint");
    const allUsers = await getAllUsers();

    allUsers.forEach(user => {
        if (user.Login === login.value && user.Password === password.value) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.open(nextPage, "_self");
            return; 
        }
    });
    setTimeout(() => {
        caption.textContent = "Неверные логин или пароль!";
        caption.style.color = "#FF0066";
    }, 250);
}

function collectResumeData() {
	let [title, tags, spec, aboutMe] = document.querySelectorAll(".resume-data");
    let clickedTags = [];

    tags = tags.querySelectorAll(".tag").forEach(tag => {
        tag.classList.contains("disabled-tag") ? null : clickedTags.push(tag.textContent);
    });

    spec.parentElement.querySelectorAll("label").forEach(l => {
        if (document.getElementById(l.attributes[0].nodeValue).checked) spec = l.textContent;
    });

    if (title.value == '' || typeof spec != "string") return 0;

    return {
        CVID: "",
        UserId: currentUser.UUID,
        Title: title.value,
        Spec: spec,
        Tags: clickedTags,
        AboutMe: aboutMe.value
    }
}

async function createNewResume(cvWrapper) {
    let data = collectResumeData();
    if (data == 0) return;

    if (cvWrapper) return updateProfileCV(cvWrapper, data);

    CVs.push(data);
    copiedCV = [...CVs];    //обновляю данные для фильтра
    await createCV(data);
    // currentUser.CVs.push(data.CVID);
    openResume(1);
}

async function updateProfileCV(cvWrapper, data) {
    CVs.forEach(cv => {
        if (cv.CVID == data.CVID) cv = data;
    });

    await updateCV(currentUser.UUID, data);
    rerenderOneCV(cvWrapper, data);
    openResume();
}

//profile button
async function saveProfile() {
    let [name, contacts] = document.querySelectorAll(".name-input");
    let course = document.querySelector(".radio-grid");

    name = name.querySelector("input").value;
    contacts = contacts.querySelector("input").value;

    course.parentElement.querySelectorAll("label").forEach(l => {
        if (document.getElementById(l.attributes[0].nodeValue).checked) course = l.textContent.split(" ")[0];
    });

    await updateUser(currentUser.UUID, {
        LFM: name ? name : currentUser.LFM,
        Course: course ? course : currentUser.Course,
        ContactData: contacts ? contacts : currentUser.ContactData,
    });

    window.open('./main.html', '_self');
}

//auth animations
function setAuthAnimations() {
    let creators = document.querySelector(".creators")
    let [name, role1, role2] = creators.querySelectorAll("*");
    
    creators.style.animation = "creators 4s ease infinite";

    name.textContent = "Сергей Кривостаненко";
    role1.textContent = "Верстка и адаптация проекта";
    role2.textContent = "Разработка дизайна проекта";

    setTimeout(() => {
        name.textContent = "Пьянков Максим";
        role1.textContent = "Разработка структуры DB проекта";
        role2.textContent = "Транспортировка данных и логика проекта";
    }, 2000);

    setTimeout(() => {
        setInterval(() => {
            if (name.textContent.includes("Максим")) {
                name.textContent = "Сергей Кривостаненко";
                role1.textContent = "Верстка и адаптация проекта";
                role2.textContent = "Разработка дизайна проекта";
            } else {
                name.textContent = "Пьянков Максим";
                role1.textContent = "Разработка структуры DB проекта";
                role2.textContent = "Транспортировка данных и логика проекта";
            }
        }, 4000)

        name.textContent = "Сергей Кривостаненко";
        role1.textContent = "Верстка и адаптация проекта";
        role2.textContent = "Разработка дизайна проекта";
    }, 6000);
}

if (window.location.href.includes("auth")) {
    document.addEventListener("DOMContentLoaded", async function(){
        setAuthAnimations();
        CVs = await getAllCVs();
        handleShortCV();

        let [login, password] = document.querySelectorAll("input");
        login.value = "";
        password.value = "";
    });
} else {
    document.addEventListener("DOMContentLoaded", async function() {
        CVs = await getAllCVs();
        //allUsers = await getAllUsers();
        renderCVs();
    });
}

function handleShortCV(action) {
    const [leftArrow, rightArrow] = document.querySelectorAll(".controller");

    const parent = document.querySelector(".decor-mini-info");
    let [name, spec] = parent.querySelector(".header").querySelectorAll("*");
    let description = parent.querySelector(".description");
    let cvI = 0;
    CVs.forEach((cv, idx) => {
        if (cv.Title == name.textContent) cvI = idx;
    });

    if (!action) {
        name.textContent = CVs[cvI].Title;
        spec.textContent = CVs[cvI].Spec;
        description.textContent = CVs[cvI].AboutMe;
    } else if (action == "right") {
        parent.style.animation = "nextCv .5s ease";
        setTimeout(() => {
            name.textContent = CVs[cvI += 1].Title;
            spec.textContent = CVs[cvI].Spec;
            description.textContent = CVs[cvI].AboutMe;
        }, 250)
    } else {
        parent.style.animation = "prevCv .5s ease";
        setTimeout(() => {
            name.textContent = CVs[cvI -= 1].Title;
            spec.textContent = CVs[cvI].Spec;
            description.textContent = CVs[cvI].AboutMe;
        }, 250)
    }
    blockAuthButtons(cvI);
}

function blockAuthButtons(index) {
    const [leftArrow, rightArrow] = document.querySelectorAll(".controller");
    const [lsvg, rsvg] = document.getElementsByTagName("path");

    if (CVs[index + 1] === undefined) {
        rightArrow.classList.add("disable-button");
        rsvg.style.fill = "#EEE1F2";
    } else if (rightArrow.classList.contains("disable-button")) {
        rightArrow.classList.remove("disable-button");
        rsvg.style.fill = "#6443B2";
    }

    if (CVs[index - 1] === undefined) {
        leftArrow.classList.add("disable-button");
        lsvg.style.fill = "#EEE1F2";
    } else if (leftArrow.classList.contains("disable-button")) {
        rightArrow.classList.remove("disable-button");
        lsvg.style.fill = "#6443B2";
    }
}