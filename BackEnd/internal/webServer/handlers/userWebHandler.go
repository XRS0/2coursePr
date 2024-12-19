package handlers

import (
	"second/internal/handlers/userHandler"
	"second/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CreateUserHandler(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := userHandler.CreateUser(&user, h.DB); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(500, gin.H{"message": "Пользователь создан", "data": user})
}

func (h *Handler) GetAllUsersHandler(c *gin.Context) {
	users, err := userHandler.GetAllUsers(h.DB)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, users)
}

func (h *Handler) GetUserByUUIDHandler(c *gin.Context) {
	uuid := c.Param("uuid")
	user, err := userHandler.GetUserByUUID(uuid, h.DB)
	if err != nil {
		c.JSON(404, gin.H{"error": "Пользователь не найден"})
		return
	}

	c.JSON(200, user)
}

func (h *Handler) UpdateUserHandler(c *gin.Context) {
	uuid := c.Param("uuid")
	var updatedFields map[string]interface{}
	if err := c.ShouldBindJSON(&updatedFields); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := userHandler.UpdateUser(uuid, updatedFields, h.DB); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Пользователь обновлен"})
}

func (h *Handler) DeleteUserHandler(c *gin.Context) {
	uuid := c.Param("uuid")
	if err := userHandler.DeleteUser(uuid, h.DB); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Пользователь удален"})
}
