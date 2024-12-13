package handlers

import (
	"fmt"
	"net/http"
	"second/internal/handlers/resumeHandler"
	"second/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CreateCVHandler(c *gin.Context) {
	var cv models.CV

	// Попытка распарсить JSON
	if err := c.BindJSON(&cv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Логирование полученных данных
	fmt.Printf("Полученные данные: %+v\n", cv)

	// Проверка, что CVID не пустой
	if cv.CVID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CVID не может быть пустым"})
		return
	}

	// Сохранение в базе
	result := h.DB.Create(&cv)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, cv)
}

func (h *Handler) GetAllCVsHandler(c *gin.Context) {
	cvs, err := resumeHandler.GetAllCVs(h.DB)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, cvs)
}

func (h *Handler) GetCVByIDHandler(c *gin.Context) {
	cvid := c.Param("cvid")
	cv, err := resumeHandler.GetCVByID(cvid, h.DB)
	if err != nil {
		c.JSON(404, gin.H{"error": "Резюме не найдено"})
		return
	}

	c.JSON(200, cv)
}

func (h *Handler) UpdateCVHandler(c *gin.Context) {
	cvid := c.Param("cvid")
	var updatedFields map[string]interface{}
	if err := c.ShouldBindJSON(&updatedFields); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := resumeHandler.UpdateCV(cvid, updatedFields, h.DB); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Резюме обновлено"})
}

func (h *Handler) DeleteCVHandler(c *gin.Context) {
	cvid := c.Param("cvid")
	if err := resumeHandler.DeleteCV(cvid, h.DB); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Резюме удалено"})
}
