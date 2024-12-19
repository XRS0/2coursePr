package models

import (
	"github.com/lib/pq"
)

type CV struct {
	CVID    string         `json:"CVID" gorm:"column:cvid;type:varchar(36);primaryKey"`
	UserID  string         `json:"UserID" gorm:"type:varchar(36);not null"`
	Title   string         `json:"Title" gorm:"not null"`
	Spec    string         `json:"Spec"`
	Tags    pq.StringArray `json:"Tags" gorm:"type:text[]"`
	AboutMe string         `json:"AboutMe"`
}

type CVToShow struct {
	Cv     CV
	LFM    string
	Course int
}
