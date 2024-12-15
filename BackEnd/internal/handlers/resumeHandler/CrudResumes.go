package resumeHandler

import (
	"second/internal/models"

	"gorm.io/gorm"
)

func CreateCV(cv *models.CV, db *gorm.DB) error {
	result := db.Create(cv)
	return result.Error
}

func GetAllCVs(db *gorm.DB) ([]models.CV, error) {
	var cvs []models.CV
	err := db.Find(&cvs).Error
	return cvs, err
}

func GetCVByID(cvid string, db *gorm.DB) (*models.CV, error) {
	var cv models.CV
	result := db.First(&cv, "cvid = ?", cvid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &cv, nil
}

func UpdateCV(cvid string, updatedData map[string]interface{}, db *gorm.DB) error {
	result := db.Model(&models.CV{}).Where("cvid = ?", cvid).Updates(updatedData)
	return result.Error
}

func DeleteCV(cvid string, db *gorm.DB) error {
	result := db.Where("cvid = ?", cvid).Delete(&models.CV{})
	return result.Error
}
