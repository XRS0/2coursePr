//Скрыть пароль, открыть
function hide() {
  let input = document.getElementById("input");
  let inputImg = document.getElementById("inputImg");

  if (input.type == "password") {
    input.type = "text";
    inputImg.src = "Frontend/src/img/eye-on.svg";
    inputImg.style.width = "24px";
    inputImg.style.height = "24px";
  } else {
    input.type = "password";
    inputImg.src = "Frontend/src/img/hide.svg";
  }
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
  let tag = document.querySelector(".pup-resume-tag").textContent;

  if (!title || !descr || !kurs || !status) {
    alert("Заполните все поля");
    return;
  }

  const resumeData = {
    title,
    descr,
    kurs,
    status,
    tags: selectedTags,
  };

  // Получение существующих резюме из localStorage
  let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  // Добавление нового резюме в массив
  resumes.push(resumeData);
  // Сохранение массива в localStorage
  localStorage.setItem("resumes", JSON.stringify(resumes));

  let newAnn = document.createElement("div");
  newAnn.classList.add("cont-resume-new");
  newAnn.innerHTML = `<div>
          <p class="resume-name">${title}</p>
          <p class="resume-descr">
            ${descr}
          </p>
          <p class="resume-descr">${kurs} Курс</p>
            <p class="resume-descr">${status}</p>
          <div class="resume-tag">
          <p>${selectedTags.join(", ")}</p>
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
  selectedTags = [];
  localStorage.setItem("selectedTags", JSON.stringify(selectedTags));

  document
    .querySelectorAll(".pup-resume-tag")
    .forEach((tag) => tag.classList.remove("highlighted"));
}

function loadResumes() {
  let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  let resumeContainer = document.getElementById("resume-container");
  resumes.forEach((resume) => {
    let newAnn = document.createElement("div");
    newAnn.classList.add("cont-resume-new");

    let tags = Array.isArray(resume.tags) ? resume.tags.join(", ") : "";

    newAnn.innerHTML = `
      <div>
        <p class="resume-name">${resume.title}</p>
        <p class="resume-descr">${resume.descr}</p>
        <p class="resume-descr">${resume.kurs} Курс</p>
        <p class="resume-descr">${resume.status}</p>
        <div class="resume-tag">
          <p>${tags}</p> 
        </div>
        <a href="profile.html" class="resume-butt">Перейти в профиль</a>
      </div>`;
    resumeContainer.appendChild(newAnn);
  });
}
document.addEventListener("DOMContentLoaded", loadResumes);

let selectedTags = JSON.parse(localStorage.getItem("selectedTags")) || [];

function highlight(element) {
  const tagText = element.querySelector("p").textContent;

  if (selectedTags.includes(tagText)) {
    selectedTags = selectedTags.filter((tag) => tag !== tagText);
    element.classList.remove("highlighted");
  } else {
    selectedTags.push(tagText);
    element.classList.add("highlighted");
  }

  localStorage.setItem("selectedTags", JSON.stringify(selectedTags));
}

function restoreSelectedTags() {
  const tags = document.querySelectorAll(".pup-resume-tag");

  tags.forEach((tag) => {
    const tagText = tag.querySelector("p").textContent;
    if (selectedTags.includes(tagText)) {
      tag.classList.add("highlighted");
    }
  });
}

document.addEventListener("DOMContentLoaded", restoreSelectedTags);

// Функция для фильтрации резюме по введенному тексту
function filterResumes() {
  let searchTerm = document.querySelector(".search-input").value.toLowerCase(); // Получаем текст из поля поиска
  let resumes = JSON.parse(localStorage.getItem("resumes")) || []; // Получаем все резюме
  let resumeContainer = document.getElementById("resume-container");

  // Очищаем контейнер перед добавлением отфильтрованных резюме
  resumeContainer.innerHTML = "";

  // Фильтруем резюме по названию
  let filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchTerm)
  );

  // Добавляем отфильтрованные резюме на страницу
  filteredResumes.forEach((resume) => {
    let newAnn = document.createElement("div");
    newAnn.classList.add("cont-resume-new");

    let tags = Array.isArray(resume.tags) ? resume.tags.join(", ") : "";

    newAnn.innerHTML = `
      <div>
        <p class="resume-name">${resume.title}</p>
        <p class="resume-descr">${resume.descr}</p>
        <p class="resume-descr">${resume.kurs} Курс</p>
        <p class="resume-descr">${resume.status}</p>
        <div class="resume-tag">
          <p>${tags}</p> 
        </div>
        <a href="profile.html" class="resume-butt">Перейти в профиль</a>
      </div>`;
    resumeContainer.appendChild(newAnn);
  });
}

// Добавляем обработчик события для поля поиска
document
  .querySelector(".search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      filterResumes(); // Фильтруем резюме при нажатии "Enter"
    }
  });

// Также можно добавить кнопку для ручного фильтра
document.querySelector(".search-butt").addEventListener("click", filterResumes);
