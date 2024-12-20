async function createUser(UserData) {
  try {
    const response = await fetch("http://192.168.71.111:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Ошибка создания пользователя");
    }
    const result = await response.json();
    console.log("Пользователь создан:", result);
    alert("Пользователь успешно создан!");
    return response;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось создать пользователя: " + error.message);
  }
}

var users;
var CVs;

let inputUser = document.getElementById("userName");
let inputPassword = document.getElementById("input");
let loginButton = document.getElementById("login-butt");

// function sendData() {
//   const UserData = {
//     UUID: inputUser.value,
//     password: inputPassword.value,
//     course: "1",
//     lfm: "Соколов Михаил",
//     isAdmin: false,
//     contactData: "sokolik@gmial.com",
//     status: "free",
//   };

//   localStorage.setItem("currentUserUUID", UserData.UUID);

//   let users = JSON.parse(localStorage.getItem("users")) || [];
//   users.push(UserData);
//   localStorage.setItem("currentUserUUID", JSON.stringify(users));
// }
// loginButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   sendData();
// });

//ФИЛЬТРАЦИЯ

// document.querySelector(".search-butt").addEventListener("click", function () {
//   let selectCourse = Array.from(
//     document.querySelectorAll('input[name="course"]:checked')
//   ).map((checkbox) => checkbox.value);
//   let selectSpeciality = Array.from(
//     document.querySelectorAll('input[name="spec"]:checked')
//   ).map((checkbox) => checkbox.value);
//   let selectStatus = Array.from(
//     document.querySelectorAll('input[name="status"]:checked')
//   ).map((checkbox) => checkbox.value);

//   const filterData = {
//     courses: selectCourse,
//     speciality: selectSpeciality,
//     status: selectStatus,
//   };

//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(filterData),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log("Успех:", data))
//     .catch((error) => console.error("Ошибка:", error));
// });

async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "Ошибка получения данных пользователя"
      );
    }
    const result = await response.json();
    const userUUIDs = result.map((user) => user.UUID); // Массив с только UUID пользователей
    localStorage.setItem("userUUIDs", JSON.stringify(userUUIDs));
    console.log("Пользователь получен:", result);
    return result;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось получить пользователя: " + error.message);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  users = await getAllUsers();
});

async function getAllCv() {
  try {
    const response = await fetch("http://localhost:8080/cvs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Ошибка получения резюме");
    }
    const result = await response.json();
    console.log("Резюме получено:", result);
    return result;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось получить резюме: " + error.message);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  CVs = await getAllCv();
});

async function sendCV(resumeData) {
  try {
    const response = await fetch("http://localhost:8080/cvs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resumeData),
    });
    const result = await response.json();
    console.log("Резюме отправлено:", result);
    return result;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось отправить резюме: " + error.message);
  }
}

function renderSingleResume(resume) {
  let resumeContainer = document.getElementById("resume-container");
  let newAnn = document.createElement("div");
  newAnn.classList.add("cont-resume-new");

  let tags = Array.isArray(resume.tags) ? resume.tags.join(", ") : "";

  newAnn.innerHTML = `
    <div>
      <p class="resume-name">${resume.title}</p>
      <p class="resume-descr">${resume.descr}</p>
      <p class="resume-descr">${resume.course} Курс</p>
      <p class="resume-descr">${resume.status}</p>
      <div class="resume-tag">
        <p>${tags}</p>
      </div>
      <a href="profile.html" class="resume-butt">Перейти в профиль</a>
    </div>`;
  resumeContainer.appendChild(newAnn);
}
