package resumeHandler

import (
	"second/internal/models"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

func CreateCV(cv *models.CV, db *gorm.DB) error {
	cv.CVID = uuid.New().String()
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

func GetMatchingCVs(db *gorm.DB, params models.FilterParams) ([]models.CV, error) {
	var cvs []models.CV

	query := db.Model(&models.CV{})

	// if params.Title != "" {
	// 	query = query.Where("title ILIKE ?", fmt.Sprintf("%%%s%%", params.Title))
	// }

	// if params.UserID != "" {
	// 	query = query.Where("user_id = ?", params.UserID)
	// }
	if params.Spec != "" {
		query = query.Where("spec = ?", params.Spec)
	}

	if len(params.Tags) > 0 {
		query = query.Where("tags && ?", pq.StringArray(params.Tags))
	}

	if err := query.Find(&cvs).Error; err != nil {
		return nil, err
	}

	return cvs, nil
}
