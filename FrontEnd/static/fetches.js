// Добавляем функционал для отправки данных пользователя при нажатии кнопки "Войти"
// Функция для создания пользователя
async function createUser(UserData) {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
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
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось создать пользователя: " + error.message);
  }
}

// Локальная база пользователей
var users = [];

// Получаем элементы ввода
let inputUser = document.getElementById("userName");
let inputPassword = document.getElementById("input");
let loginButton = document.getElementById("login-butt");

// Функция для отправки данных
function sendData() {
  const UserData = {
    login: inputUser.value,
    password: inputPassword.value,
    course: "1",
    lfm: "Соколов Михаил",
    isAdmin: false,
    contactData: "sokolik@gmial.com",
    status: "free",
  };

  users.push(UserData);
  localStorage.setItem("users", JSON.stringify(users));
  createUser(UserData);
}

// Привязываем функцию к кнопке (на случай, если JavaScript загрузится позже)
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  sendData();
});

//Отправил данные о фильтрации
document.querySelector(".search-butt").addEventListener("click", function () {
  let selectCourse = Array.from(
    document.querySelectorAll('input[name="course"]:checked')
  ).map((checkbox) => checkbox.value);
  let selectSpeciality = Array.from(
    document.querySelectorAll('input[name="spec"]:checked')
  ).map((checkbox) => checkbox.value);
  let selectStatus = Array.from(
    document.querySelectorAll('input[name="status"]:checked')
  ).map((checkbox) => checkbox.value);

  const filterData = {
    courses: selectCourse,
    speciality: selectSpeciality,
    status: selectStatus,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filterData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Успех:", data))
    .catch((error) => console.error("Ошибка:", error));
});
