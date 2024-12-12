package main

import (
	"log"
	"second/internal/db"
	"second/internal/handlers/resumeHandler"
	"second/internal/handlers/userHandler"
	"second/internal/models"

	"github.com/gin-gonic/gin"
)

func main() {
	DB := db.InitDB()
	// Пример: Создание пользователя
	user := models.User{
		UUID:        "123e4567-e89b-12d3-a456-426614174000",
		Login:       "user1",
		Password:    "password",
		Course:      "Programming",
		LFM:         "John Doe",
		IsAdmin:     false,
		ContactData: "email@example.com",
		Status:      "active",
	}

	err := userHandler.CreateUser(&user, DB)
	if err != nil {
		log.Fatalf("Ошибка создания пользователя: %v", err)
	}

	// Пример: Создание резюме для пользователя
	cv := models.CV{
		CVID:    "456e1237-e89b-12d3-a456-426614174000",
		UserID:  user.UUID,
		Title:   "Golang Developer",
		Spec:    "Backend Development",
		Tags:    "Golang, Microservices, REST",
		AboutMe: "Experienced Go developer.",
	}

	err = resumeHandler.CreateCV(&cv, DB)
	if err != nil {
		log.Fatalf("Ошибка создания резюме: %v", err)
	}

	// Пример: Получение пользователя с его резюме
	foundUser, err := userHandler.GetUserByUUID(user.UUID, DB)
	if err != nil {
		log.Fatalf("Ошибка получения пользователя: %v", err)
	}
	log.Printf("Пользователь: %+v", foundUser)

	// Пример: Обновление статуса пользователя
	err = userHandler.UpdateUser(user.UUID, map[string]interface{}{"Status": "inactive"}, DB)
	if err != nil {
		log.Fatalf("Ошибка обновления пользователя: %v", err)
	}

	// Пример: Удаление резюме
	err = resumeHandler.DeleteCV(cv.CVID, DB)
	if err != nil {
		log.Fatalf("Ошибка удаления резюме: %v", err)
	}

	// Пример: Удаление пользователя
	err = userHandler.DeleteUser(user.UUID, DB)
	if err != nil {
		log.Fatalf("Ошибка удаления пользователя: %v", err)
	}

	r := gin.Default()

	// Роуты для пользователей
	r.POST("/users", CreateUser)
	r.GET("/users", GetAllUsers)
	r.GET("/users/:uuid", GetUserByUUID)
	r.PATCH("/users/:uuid", UpdateUser)
	r.DELETE("/users/:uuid", DeleteUser)

	// Роуты для резюме
	r.POST("/cvs", CreateCV)
	r.GET("/cvs", GetAllCVs)
	r.GET("/cvs/:cvid", GetCVByID)
	r.PATCH("/cvs/:cvid", UpdateCV)
	r.DELETE("/cvs/:cvid", DeleteCV)

	// Запуск сервера
	r.Run(":8080")
}
