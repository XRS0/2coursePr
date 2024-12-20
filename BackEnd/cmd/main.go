package main

import (
	"second/internal/db"
	"second/internal/webServer/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	DB := db.InitDB()
	handler := &handlers.Handler{
		DB: DB,
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
	}))

	// Роут для аутентификации
	r.POST("/auth", handler.Auth)

	// Роуты для пользователей
	r.POST("/users", handler.CreateUserHandler)
	r.GET("/users", handler.GetAllUsersHandler)
	r.GET("/users/:uuid", handler.GetUserByUUIDHandler)
	r.PATCH("/users/:uuid", handler.UpdateUserHandler)
	r.DELETE("/users/:uuid", handler.DeleteUserHandler)

	// Роуты для резюме
	r.POST("/cvs", handler.CreateCVHandler)
	r.GET("/cvs", handler.GetAllCVsHandler)
	r.POST("/cvs/filtered", handler.FilterCVsHandler)
	r.GET("/cvs/:cvid", handler.GetCVByIDHandler)
	r.PATCH("/cvs/:cvid", handler.UpdateCVHandler)
	r.DELETE("/cvs/:cvid", handler.DeleteCVHandler)

	// Запуск сервера
	r.Run(":8080")
}
