package models

type User struct {
	UUID        string `gorm:"type:varchar(36);primaryKey"` // UUID как строка
	Login       string `gorm:"unique;not null"`
	Password    string `gorm:"not null"`
	Course      string
	LFM         string
	IsAdmin     bool
	ContactData string
	Status      string
	CVs         []CV `gorm:"foreignKey:UserID"`
}
