let currentUser = JSON.parse(localStorage.getItem("TestUser"));

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

function createNewResume() {
    let data = collectResumeData();
    if (data == 0) return;

    CVs.push(data);
    currentUser.CVs.push(data.CVID);
    // await createCV(data);
    openResume(1);
}

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