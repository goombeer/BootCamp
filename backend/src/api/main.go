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
    router.Use(CORSMiddleware())
    // signup
    router.POST("/singup", controller.CreateUser)
    // login
    router.POST("/login", controller.Login)

    router.POST("/auth", controller.AuthUser)

    router.GET("/auth/jwt", controller.CheckJwt)

    v1 := router.Group("/api/v1")
    {
        v1.Use(auth.CheckJWT())
        // create
        v1.POST("/todo", controller.Create)
        // get all task by userid
        v1.GET("/todo", controller.GetAllTask)
        // update
        v1.PUT("/todo/update", controller.Update)
        // delete
        v1.PUT("/todo/delete", controller.Delete)

    }

    // ポートを設定しています。
    router.Run(":3001")
}

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}