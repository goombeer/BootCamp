package models

import "github.com/jinzhu/gorm"

type Login struct {
	gorm.Model
	Email string `json:"email"`
	Password string `json:"password"`
}