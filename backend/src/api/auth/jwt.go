package auth

import (
	"time"
	"fmt"
	"github.com/gin-gonic/gin"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
)

var secretKey = "75c92a074c341e9964329c0550c2673730ed8479c885c43122c90a2843177d5ef21cb50cfadcccb20aeb730487c11e09ee4dbbb02387242ef264e74cbee97213"

func CreateJWT() string{
	token := jwt.New(jwt.GetSigningMethod("HS256"))
	token.Claims = jwt.MapClaims{
		"user": "ゲスト",
		"exp":  time.Now().Add(time.Hour * 1).Unix(),
	}
	tokenString, err := token.SignedString([]byte(secretKey))
	if err == nil {
		return tokenString
	} else {
		panic(err) 
	}
}


func CheckJWT() gin.HandlerFunc{
	return func(c *gin.Context) {
		token, err := request.ParseFromRequest(c.Request, request.OAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := []byte(secretKey)
            return b, nil
		})

		if err == nil {
            claims := token.Claims.(jwt.MapClaims)
            msg := fmt.Sprintf("こんにちは、「 %s 」さん", claims["user"])
            c.JSON(200, gin.H{"message": msg})
        } else {
			c.JSON(401, gin.H{"message": "no token present in request", "status": 401, "error": fmt.Sprint(err)})
			c.Abort()
        }
	}
}
