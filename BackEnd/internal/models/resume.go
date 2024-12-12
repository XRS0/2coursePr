package models

type CV struct {
	CVID    string `gorm:"type:varchar(36);primaryKey"` // Строковый ID резюме
	UserID  string `gorm:"type:varchar(36);not null"`   // Строковый внешний ключ
	Title   string `gorm:"not null"`
	Spec    string
	Tags    []string `gorm:"type:text[]"`
	AboutMe string
}
