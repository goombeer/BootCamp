package models

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Email string `json:"email"`
	Password string `json:"password"`
	Firstname string  `json:"firstname"`
	Lastname string `json:"lastname"`
}