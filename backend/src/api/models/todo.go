package models

import "github.com/jinzhu/gorm"

type Todo struct {
    gorm.Model
    Content  string
    Deadline string
    Punishment string
}