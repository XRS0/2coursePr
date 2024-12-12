//Скрыть пароль, открыть
function hide() {
  let input = document.getElementById("input");
  let inputImg = document.getElementById("inputImg");

  if (input.type == "password") {
    input.type = "text";
    inputImg.src = "/src/img/eye-on.svg";
    inputImg.style.width = "24px";
    inputImg.style.height = "24px";
  } else {
    input.type = "password";
    inputImg.src = "/src/img/hide.svg";
  }
}

//Отправка логина, пароля
var users = [];

let inputUser = document.getElementById("userName");
let inputPassword = document.getElementById("input");

function sendData() {
  const UserData = {
    name: inputUser.value,
    password: inputPassword.value,
  };
  users.push(UserData);

  fetch(url, {
    method: "POST",
    headers: {
      "Contetn-Type": "aplication/json",
    },
    body: JSON.stringify(UserData),
  });
}

//Открыть Pop-up, закрыть
function showPopup() {
  document.getElementById("popup").classList.add("active");
  document.addEventListener("keydown", closePopup);
}

function closePopup(event) {
  if (event.key === "Escape") {
    document.getElementById("popup").classList.remove("active");
  }
}

//Создание резюме
function createRes() {
  let title = document.getElementById("popup-title").value;
  let descr = document.getElementById("popup-descr").value;
  let kurs = document.getElementById("popup-kurs").value;
  let status = document.getElementById("popup-status").value;
  let tag = document.getElementsByClassName("pup-resume-tag").value;

  if (!title || !descr || !kurs || !status) {
    alert("Заполните все поля");
    return;
  }

  const resume = { title, descr, kurs, status, tag };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(resume),
  });

  let newAnn = document.createElement("div");
  newAnn.classList.add("cont-resume-new");
  newAnn.innerHTML = `<div>
          <p class="resume-name">${title}</p>
          <p class="resume-descr">
            ${descr}
          </p>
          <p class="resume-descr">Курс: ${kurs}</p>
            <p class="resume-descr">Статус: ${status}</p>
          <div class="resume-tag">
          <p>JS</p>
          </div>
          <a href="profile.html" class="resume-butt">Перейти в профиль</a>
        </div>
      </div>`;

  let resumeContainer = document.getElementById("resume-container");
  resumeContainer.appendChild(newAnn);

  document.getElementById("popup-title").value = "";
  document.getElementById("popup-descr").value = "";
  document.getElementById("popup-kurs").value = "";
  document.getElementById("popup-status").value = "";
  document.getElementById("popup").classList.remove("active");
}

function highlight(element) {
  element.classList.add("highlighted");
}

function highlight(element) {
  element.classList.toggle("highlighted");
}
