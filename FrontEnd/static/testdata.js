//вызовите при загрузке страницы для теста фронтенда

/*localStorage.setItem("TestUser", JSON.stringify({
    UUID: 'lol',
    Login: 'i23s0130',
    Password: 'serg33500',
    Course: '1',
    LFM: 'Бобоев Сергей',
    IsAdmin: false,
    ContactData: '',
    Status: '',
    CVs: ['bobo'],

    isRegistered: false      //служебное поле чтобы понять зарегался ли человек
})); */

let CVs = [
    {
        CVID: 'bobo',
        UserID: 'lol',
        Title: "Frontend помойка",
        Spec: "Design",
        Tags: ["#UX/UI", "#JavaScript"],
        AboutMe: "Да я бомбил это все уже сегодня"
    }
];

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

// localStorage.setItem("TestUser", JSON.stringify(obj));