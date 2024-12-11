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

//Массив Users(name, пароль)
var users = [];
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

let inputUser = document.getElementById("userName");
let inputPassword = document.getElementById("input");

let login = document.getElementById("login-butt");
login.onclick = function () {
  users.push(new User(inputUser.value, inputPassword.value));
  console.log(users);
};

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

  let newAnn = document.createElement("div");
  newAnn.classList.add("cont-resume-new");
  newAnn.innerHTML = `<div>
          <p class="resume-name">${title}</p>
          <p class="resume-descr">
            ${descr}
          </p>
          <div class="resume-tag">
          
          </div>
        </div>
        <button class="resume-butt">Перейти в профиль</button>
      </div>`;

  let resumeContainer = document.getElementById("resume-container");
  resumeContainer.appendChild(newAnn);

  document.getElementById("popup-title").value = "";
  document.getElementById("popup-descr").value = "";
  document.getElementById("popup-kurs").value = "";
  document.getElementById("popup-status").value = "";
  document.getElementById("popup").classList.remove("active");
}

//Переход на другую страницу
document.getElementById("login-butt").addEventListener("click", function () {
  window.location.href = "resume.html";
});

function highlight(element) {
  element.classList.add("highlighted");
}

function highlight(element) {
  element.classList.toggle("highlighted");
}
