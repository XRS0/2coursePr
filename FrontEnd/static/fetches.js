async function createUser(userData) {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка создания пользователя');
        }
        
        const result = await response.json();
        console.log('Пользователь создан:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
createUser({
    login: 'newuser',
    password: 'securepassword',
    course: 'Programming',
    lfm: 'Jane Doe',
    isAdmin: false,
    contactData: 'jane@example.com',
    status: 'active'
});

async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка получения пользователей');
        }
        
        const users = await response.json();
        console.log('Все пользователи:', users);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
getAllUsers();  // имба спасибо

async function updateUser(uuid, updatedData) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${uuid}`, {
            method: 'PUT',
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
updateUser('123e4567-e89b-12d3-a456-426614174000', {
    login: 'updatedUser',
    course: 'Advanced Programming'
});

async function deleteUser(uuid) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${uuid}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка удаления пользователя');
        }
        
        console.log('Пользователь удален');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
deleteUser('123e4567-e89b-12d3-a456-426614174000');

async function createCV(cvData) {
    try {
        const response = await fetch('http://localhost:8080/api/cvs', {
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

// Пример использования:
createCV({
    cvid: '123e4567-e89b-12d3-a456-426614174001',
    userID: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Golang Developer',
    spec: 'Backend Development',
    tags: ['Golang', 'Microservices', 'REST'], // Массив строк
    aboutMe: 'Experienced Go developer.'
});

async function getAllCVs() {
    try {
        const response = await fetch('http://localhost:8080/api/cvs', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка получения резюме');
        }
        
        const cvs = await response.json();
        console.log('Все резюме:', cvs);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример использования:
getAllCVs();

