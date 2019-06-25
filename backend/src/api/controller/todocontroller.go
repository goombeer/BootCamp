package controller

import (

	"api/database"
	"api/models"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"net/http"
)


func Create(c *gin.Context) {
   	db := database.GormConnect()

	var todo models.Todo
	err := c.BindJSON(&todo)
	if err != nil {
	  c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
	  return
	}

	res := db.Create(&todo)
	if res.Error != nil {
		c.JSON(402, gin.H{"status": 402, "msg":res.Error })
	} else {
		c.JSON(200, gin.H{"status": 200, "msg":"success!"})
	}
}

func GetAllTask(c *gin.Context) {
	db := database.GormConnect()
	log.Println(c.Request)
	userid := c.Query("user_id")
	todos := []models.Todo{}

	res := db.Where("user_id = ? AND delete_flag = ?", userid, false).Find(&todos)
	log.Println(todos)
	if res.Error != nil || len(todos) == 0 {
		c.JSON(402, gin.H{"status": 402, "msg": "no data" })
	} else {
		c.JSON(200, gin.H{"status": 200, "msg":"success!", "todos": todos})
	}
}

func Update(c *gin.Context) {
	db := database.GormConnect()

	var todo models.Todo

	todoErr := c.BindJSON(&todo)
	if todoErr != nil{
		log.Println(todoErr)
		c.String(http.StatusBadRequest, "Request is failed: ")
		return
	}
	log.Println(todo)
	res := db.Debug().Model(&todo).Where("id = ? AND user_id = ?", todo.ID, todo.UserID).Update(&todo)
	if res.Error != nil {
		c.JSON(402, gin.H{"status": 402, "msg": "no data" })
	} else {
		c.JSON(200, gin.H{"status": 200, "msg":"success!", "todos": todo})
	}

}

func Delete(c *gin.Context) {
	db := database.GormConnect()

	todo := models.Todo{}

	err := c.BindJSON(&todo)
	if err != nil {
		log.Println("------")
		log.Fatal(err)
		c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
		return
	}

	res := db.Debug().Model(&todo).Where("id = ?", todo.ID).Update(&todo)
	if res.Error != nil {
		c.JSON(402, gin.H{"status": 402, "msg": "no data" })
	} else {
		c.JSON(200, gin.H{"status": 200, "msg":"success!", "data": todo})
	}
}