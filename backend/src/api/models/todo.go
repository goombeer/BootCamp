package models

import "github.com/jinzhu/gorm"

type Todo struct {
    gorm.Model
    ID  uint64 `gorm:"primary_key" json:"todo_id"`
    UserID int ` json:"user_id"`
    Content  string `json:"content"`
    Deadline string `json:"deadline"`
    Punishment string `json:"punishment"`
    Done bool `gorm:"DEFAULT: false" json:"done_flag"`
    DeleteFlag bool `gorm:"DEFAULT: false" json:"delete_flag"`
}
