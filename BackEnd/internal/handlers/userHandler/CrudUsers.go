package userHandler

import (
	"second/internal/models"

	"gorm.io/gorm"
)

func CreateUser(user *models.User, db *gorm.DB) error {
	result := db.Create(user)
	return result.Error
}

func GetAllUsers(db *gorm.DB) ([]models.User, error) {
	var users []models.User
	result := db.Preload("CVs").Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

func GetUserByUUID(uuid string, db *gorm.DB) (*models.User, error) {
	var user models.User
	result := db.Preload("CVs").First(&user, "uuid = ?", uuid)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func UpdateUser(uuid string, updatedData map[string]interface{}, db *gorm.DB) error {
	result := db.Model(&models.User{}).Where("uuid = ?", uuid).Updates(updatedData)
	return result.Error
}

func DeleteUser(uuid string, db *gorm.DB) error {
	result := db.Where("uuid = ?", uuid).Delete(&models.User{})
	return result.Error
}
