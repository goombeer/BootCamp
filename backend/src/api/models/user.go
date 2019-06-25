package models

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Email string `json:"email"`
	Password string `json:"password"`
	Firstname string  `json:"firstname"`
	Lastname string `json:"lastname"`
	Verifytoken string  `json:"flag"`
	Verify bool  `gorm:"DEFAULT: false" json:"flag"`
}

// jsonから構造体に変換するために書いたけど、他にスマートな方法はないのか
type UserId struct {
	Id int `json:"user_id"`
}