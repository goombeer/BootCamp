package controller

import (
	"net/http"
	"api/database"
	"api/models"
	"log"
	"github.com/gin-gonic/gin"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "strconv"
)


func Create(c *gin.Context) {
   	db := database.GormConnect()
	log.Println("test")
	todo := models.Todo{}
	err := c.Bind(&todo)
	if err != nil {
	  c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
	  return
	}

	db.NewRecord(&todo)
	res := db.Create(&todo)
	if res.Error != nil {
	  c.JSON(402, res.Error)
	} else {
	  c.JSON(200, nil)
	}
}

func Index_id(c *gin.Context) {
	db := database.GormConnect()

	id := c.Param("id")
	var todo models.Todo
	db.First(&todo, id) 
	c.JSON(200, todo)
}

func Update(c *gin.Context) {
	db := database.GormConnect()

	id, _ := strconv.Atoi(c.Param("id"))
	todo := models.Todo{}
	db.First(&todo, id)

	params := models.Todo{}
	err := c.Bind(&params)
	if err != nil {
		c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
		return
	}
	db.Model(&todo).Updates(params)
	c.JSON(200, todo)
}

func Delete(c *gin.Context) {
	db := database.GormConnect()

	id, _ := strconv.Atoi(c.Param("id"))
	db.Where("id = ?", id).Unscoped().Delete(&models.Todo{})
	c.JSON(200, nil)
}