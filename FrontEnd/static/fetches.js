// async function createUser(userData) {
//     try {
//         const response = await fetch('http://localhost:8080/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userData)
//         });
        
//         if (!response.ok) {
//             throw new Error('Ошибка создания пользователя');
//         }
        
//         const result = await response.json();
//         console.log('Пользователь создан:', result);
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

// Пример использования:
// createUser({
//     UUID: 'sldfj',
//     Login: 'newuser',
//     Password: 'securepassword',
//     Course: 'Programming',
//     LFM: 'Jane Doe',
//     IsAdmin: false,
//     ContactData: 'jane@example.com',
//     Status: 'active',
// });

async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка получения пользователей');
        }
        
        const users = await response.json();
        console.log('Все пользователи:', users);
        return users;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function updateUser(uuid, updatedData) {
    try {
        const response = await fetch(`http://localhost:8080/users/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка обновления пользователя');
        }
        
        const result = await response.json();
        console.log('Пользователь обновлен:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
// updateUser('123e4567-e89b-12d3-a456-426614174000', {
//     Login: 'updatedUser',
//     Course: 'Advanced Programming'
// });

async function createCV(cvData) {
    console.log(cvData);
    try {
        const response = await fetch('http://localhost:8080/cvs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cvData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка создания резюме');
        }
        
        const result = await response.json();
        console.log('Резюме создано:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function updateCV(cvid, updatedFields) {
    try {
        const response = await fetch(`http://localhost:8080/cvs/${cvid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Ошибка ${response.status}: ${errorData.error}`);
        }

        const result = await response.json();
        console.log('Резюме обновлено:', result.message);
    } catch (error) {
        console.error('Ошибка при обновлении резюме:', error);
    }
}

// Пример использования:
// createCV({
//     CVID: '123e4567-e89b-12d3-a456-426614174001',
//     UserID: '123e4567-e89b-12d3-a456-426614174000',
//     Title: 'Golang Developer',
//     Spec: 'Backend',
//     Tags: ['Golang', 'Microservices', 'REST'], // Массив строк
//     AboutMe: 'Experienced Go developer.'
// });

async function getAllCVs() {
    try {
        const response = await fetch('http://localhost:8080/cvs', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка получения резюме');
        }
        
        const cvs = await response.json();
        //console.log('Все резюме:', cvs);
        return cvs;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
// getAllCVs();


// const filterParams = {
//     Title: "Developer", // Фильтрация по заголовку
//     Spec: "BackEnd",    // Фильтрация по специализации
//     Tags: ["#Go"], // Фильтрация по тегам
//     User_id: "123e4567-e89b-12d3-a456-426614174000" // ID пользователя
// };
  
// // Конвертируем параметры в строку запроса
// const queryString = new URLSearchParams({
//   title: filterParams.Title,
//   spec: filterParams.Spec,
//   "tags[]": filterParams.Tags, // Передаем массив тегов
//   user_id: filterParams.User_id
// }).toString();

// // Выполняем fetch-запрос
// function FilterCVs(filterRequirement) {
//     fetch('http://localhost:8080/cvs', {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(filterRequirement)

//     }).then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     }).then((data) => {
//       console.log("Filtered CVs:", data);
//     }).catch((error) => {
//       console.error("Error fetching CVs:", error);
//     })
// }

// Создаем параметры для фильтрации
function filterCV(option) {
    // Конвертируем параметры в строку запроса
    const queryString = new URLSearchParams({
      Spec: option.spec,
      Tags: option.tags, // Передаем массив тегов
    }).toString();
    console.log(queryString);
    
      // Выполняем fetch-запрос
    fetch(`http://localhost:8080/cvs/${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Парсим JSON из ответа
    }).then((data) => {
      console.log("Filtered CVs:", data); // Обрабатываем данные
    }).catch((error) => {
      console.error("Error fetching CVs:", error);
    });
}