package main

import (
    "api/controller"
    "api/database"
    "api/models"
    "api/auth"
    "github.com/gin-gonic/gin"
)


  
func main() {
    db := database.GormConnect()

    db.AutoMigrate(&models.User{}, &models.Todo{})

    router := gin.Default()
    // signup
    router.POST("/singup", controller.CreateUser)
    // login
    router.POST("/login", controller.Login)
    v1 := router.Group("/api/v1")
    {
        v1.Use(auth.CheckJWT())
        // create
        v1.POST("/todo", controller.Create)
        // id read
        v1.GET("/todo/:id", controller.Index_id)
        // update
        v1.PUT("/todo/:id", controller.Update)
        // delete
        v1.DELETE("/todo/:id", controller.Delete)

    }

    // ポートを設定しています。
    router.Run(":3001")
}