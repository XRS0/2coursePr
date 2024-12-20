package handlers

import (
	"fmt"
	"net/http"
	"second/internal/handlers/resumeHandler"
	"second/internal/handlers/userHandler"
	"second/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (h *Handler) CreateCVHandler(c *gin.Context) {
	var cv models.CV

	if err := c.BindJSON(&cv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	cv.CVID = uuid.New().String()

	fmt.Printf("Полученные данные: %+v\n", cv)

	err := resumeHandler.CreateCV(&cv, h.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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

	var cvsToShow []models.CVToShow

	for _, cv := range cvs {
		user, err := userHandler.GetUserByUUID(cv.UserID, h.DB)
		var cvToShow = models.CVToShow{
			Cv:     cv,
			LFM:    user.LFM,
			Course: user.Course,
		}
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		cvsToShow = append(cvsToShow, cvToShow)
	}

	c.JSON(200, cvsToShow)
}

func (h *Handler) FilterCVsHandler(c *gin.Context) {
	var params models.FilterParams
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query parameters"})
		return
	}

	fmt.Println(params)

	cvs, err := resumeHandler.GetMatchingCVs(h.DB, params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var cvsToShow []models.CVToShow

	for _, cv := range cvs {
		user, err := userHandler.GetUserByUUID(cv.UserID, h.DB)
		var cvToShow = models.CVToShow{
			Cv:     cv,
			LFM:    user.LFM,
			Course: user.Course,
		}
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		cvsToShow = append(cvsToShow, cvToShow)
	}

	c.JSON(200, cvsToShow)
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

	if tags, ok := updatedFields["Tags"].([]interface{}); ok {
		var stringTags []string
		for _, tag := range tags {
			if tagStr, ok := tag.(string); ok {
				stringTags = append(stringTags, tagStr)
			} else {
				c.JSON(400, gin.H{"error": "Invalid Tags format, expected array of strings"})
				return
			}
		}
		updatedFields["Tags"] = stringTags
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
