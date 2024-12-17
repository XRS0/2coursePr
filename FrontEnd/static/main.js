const currentUser = JSON.parse(localStorage.getItem("TestUser"));
let CVs = JSON.parse(localStorage.getItem("CvArray"));

let colors = {
    ["#HTML/CSS"]: "rgba(0, 112, 255, 1)",
    ["#JavaScript"]: "rgba(255, 149, 0, 1)",
    ["#React"]: "rgba(255, 4, 105, 1)",
    ["#GoLang"]: "rgba(0, 255, 242, 1)",
    ["#Java"]: "rgba(255, 246, 0, 1)",
    ["#C/C#"]: "rgba(0, 255, 9, 1)",
    ["#C++"]: "rgba(255, 0, 0, 1)",
    ["#Web"]: "rgba(149, 255, 0, 1)",
    ["#UX/UI"]: "rgba(255, 0, 200, 1)"
}

function openWindow(link, executor) {
    if (checkRegister()) {
        console.log(executor);
        
        window.location.href = `./auth.html?${executor}`;
        return;
    }
    window.open(link, '_self');
}

function checkRegister() {
    if (!currentUser.isRegistered) {
        return 1;
    }
    return 0;
}

async function trySign() {
    let [login, password] = document.querySelectorAll("input");
    const caption = document.querySelector(".user-hint");
    //const allUsers = await getAllUsers();                         //надеемся получить массив

    //allUsers.forEach(user => {
    if (currentUser.Login === login.value && currentUser.Password === password.value) {
        currentUser.isRegistered = true;
        localStorage.setItem("TestUser", JSON.stringify(currentUser));
        window.open(nextPage, "_self");
    }
    else {
        caption.textContent = "Неверные логин или пароль!";
        caption.style.color = "#FF0066";
    }
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

    if (title == '' || typeof spec != "string") return 0;

    return {
        CVID: "toto",
        UserId: currentUser,
        Title: title.value,
        Spec: spec,
        Tags: clickedTags,
        AboutMe: aboutMe.value
    }
}

function createNewResume(cvWrapper) {
    let data = collectResumeData();
    if (data == 0) return;

    if (cvWrapper) return updateCV(cvWrapper, data);

    CVs.push(data);
    currentUser.CVs.push(data.CVID);
    // await createCV(data);
    openResume(1);
}

function updateCV(cvWrapper, data) {
    CVs.forEach(cv => {
        if (cv.CVID == data.CVID) cv = data;
    });
    rerenderOneCV(cvWrapper, data);
    openResume();
}

//profile button
function saveProfile() {
    let [name, contacts] = document.querySelectorAll(".name-input");
    let course = document.querySelector(".radio-grid");

    name = name.querySelector("input").value;
    contacts = contacts.querySelector("input").value;

    course.parentElement.querySelectorAll("label").forEach(l => {
        if (document.getElementById(l.attributes[0].nodeValue).checked) course = l.textContent.split(" ")[0];
    });

    let item = JSON.parse(localStorage.getItem("TestUser"));
    item.LFM = name;
    item.Course = course;
    item.ContactsData = contacts;
    
    localStorage.setItem("TestUser", JSON.stringify(item));

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
    document.addEventListener("DOMContentLoaded", setAuthAnimations);
    handleShortCV();
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

}