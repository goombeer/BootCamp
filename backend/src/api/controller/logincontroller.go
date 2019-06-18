package controller

import (
	"net/http"
	"api/database"
	"api/models"
	"api/auth"
	"log"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateUser(c *gin.Context) {
	db := database.GormConnect()

	var user models.User
	err := c.BindJSON(&user)

	if err != nil {
	  c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
	  return
	}
	res := db.Create(&user)
	if res.Error != nil {
		c.JSON(402, res.Error)
	  } else {
		tokenString := auth.CreateJWT()
		c.JSON(200, gin.H{"token": tokenString, "status": 200})
	}
}

func Login(c *gin.Context) {
	db := database.GormConnect()

	var users []models.User

	db.Debug().Where("email = ? AND password = ?", c.Query("email"), c.Query("password")).First(&users)
	
	if len(users) == 0 {
		c.JSON(402, "no data")
	  } else {
		log.Println(users)
		tokenString := auth.CreateJWT()
		c.JSON(200, gin.H{"token": tokenString, "status": 200})
		return
	}
}


