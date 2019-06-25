package controller

import (
	"api/auth"
	"api/database"
	"api/models"
	"github.com/dgrijalva/jwt-go/request"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"net/http"
)

var secretKey = "75c92a074c341e9964329c0550c2673730ed8479c885c43122c90a2843177d5ef21cb50cfadcccb20aeb730487c11e09ee4dbbb02387242ef264e74cbee97213"

type UserInfo struct {
  Userid uint
  Email string
  Firstname string
  Lastname string
}


func CreateUser(c *gin.Context) {
	db := database.GormConnect()

	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
	  c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
	  return
	}
	// requestデータへアクセスしたい...
	req:= &user
	
	// password is hashed
	pwhash, err := auth.MakeHash(req.Password)
	if err != nil {
	    c.JSON(500, gin.H{"msg": "サーバーエラー", "status": 500, "err":err})
	}

	// verifytoken is created
	log.Println(req.Email)
	verifytoken, err := auth.MakeHash(req.Email)
	if err != nil {
	    c.JSON(500, gin.H{"msg": "サーバーエラー", "status": 500, "err":err})
	}

	req.Password = pwhash
	req.Verifytoken = verifytoken

	res := db.Create(&user)

	if res.Error != nil {
		c.JSON(402, gin.H{"status": 402, "msg":res.Error })
	  } else {
		// フロントのURLを記載する
		url := "http://localhost:3000/activation?token=" + req.Verifytoken
		log.Println(url)

		// 認証メールを送信
		err = auth.SendMail("xxxxxx", req.Email, "TEST" ,url)
		if err != nil {
			c.JSON(500, gin.H{"status": 500, "msg":err})
		} else {
			c.JSON(200, gin.H{"status": 200})
		}

	}
}

func Login(c *gin.Context) {
	db := database.GormConnect()

	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
	  c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
	  return
	}

	// userモデルにbindしたデータをアクセスできるようにする
	req:= &user
	// hash化する前のデータを保持しておく
	pw :=req.Password

	// emailでpasswordを取り出す
	result := db.Select("password").Where("email = ?", req.Email).Find(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{"msg": "サーバーエラー", "status": 500})
		c.Abort()
		return
	}

	req = &user
	// 入力されたpwが格納されているhashと一致するか確認。ダメならBad Request
	res := auth.PasswordVerify(req.Password, pw)
    if res != nil {
		c.JSON(403, gin.H{"msg": "認証失敗", "status": 403})
		c.Abort()
		return
	}
	
	log.Println("認証成功")
	
	result = db.Select("firstname, lastname, email, id").Where("email = ? AND password = ?", req.Email, req.Password).First(&user)
	req = &user
	if result.Error != nil  {
		c.JSON(402, "no data")
		c.Abort()
		return
	} else {
		tokenString := auth.CreateJWT()
		log.Println(req)
		log.Println(req.ID)
		userinfo := UserInfo{Userid:req.ID, Email: req.Email, Firstname: req.Firstname, Lastname: req.Lastname}
		c.JSON(200, gin.H{"token": tokenString, "status": 200, "info": userinfo})
		return
	}
}

func AuthUser(c *gin.Context) {
	// tokenを取り出す
	var token models.AuthToken

	err := c.BindJSON(&token)
	if err != nil {
		c.String(http.StatusBadRequest, "Request is failed: "+err.Error())
		return
	}

	// dbを検索する
	db := database.GormConnect()
	var user models.User
	db.Select("verify, verifytoken").Where("verifytoken = ?", token.Token).Find(&user)

	req := &user

	if token.Token != req.Verifytoken{
		// 一致しないならBadリクエストで
		c.JSON(403, gin.H{"msg": "認証失敗", "status": 403})
		c.Abort()
		return
	} else {
		db.Model(&user).Where("verifytoken = ?", token.Token).Update("verify", true)
		// 一致するならflagを1にして、token,status,urlを返却する
		tokenString := auth.CreateJWT()
		c.JSON(200, gin.H{"token": tokenString, "status": 200})
	}

	return
}

func CheckJwt(c *gin.Context)  {
	log.Println(c.Request)
	token, err := request.ParseFromRequest(c.Request, request.OAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
		b := []byte(secretKey)
		return b, nil
	})

	if err == nil {
		tokenString := auth.CreateJWT()
		log.Println(token)
		c.JSON(200, gin.H{"status": 200, "token": tokenString})
	} else {
		c.JSON(401, gin.H{"message": "no token present in request", "status": 401, "error": err})
		c.Abort()
	}
}
