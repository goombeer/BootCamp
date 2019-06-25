package database

import (
	"github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

func GormConnect() *gorm.DB {
  
    db,err := gorm.Open("mysql", "root:password@tcp(mysql:3306)/bootcamp?charset=utf8&parseTime=True&loc=Local")

    if err != nil {
      panic(err.Error())
    } 

    return db
}