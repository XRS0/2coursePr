package models

type CV struct {
	CVID    string `gorm:"type:varchar(36);primaryKey"` // Уникальный идентификатор резюме
	UserID  string `gorm:"type:varchar(36);not null"`   // Внешний ключ
	Title   string `gorm:"not null"`
	Spec    string
	Tags    string
	AboutMe string
}
