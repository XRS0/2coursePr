package models

type User struct {
	UUID        string `gorm:"type:varchar(36);primaryKey"` // UUID как строка
	Password    string `gorm:"not null"`
	Course      int
	LFM         string
	IsAdmin     bool
	ContactData string
	Status      string
	CVs         []CV `gorm:"foreignKey:UserID"`
}
