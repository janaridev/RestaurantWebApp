package middleware

import (
	"authService/initializers"
	"authService/models"
	"authService/utils"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func RequireAuth(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	ctx, client, err := utils.ConnectToRedis()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	defer client.Close()

	secret, err := client.Get(*ctx, "SECRET").Result()
	if err != nil {
		fmt.Println("Error getting key:", err)
		c.AbortWithStatus(http.StatusInternalServerError)
	}
	fmt.Println("Value:", secret)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(secret), nil
	})
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		expFloat, ok := claims["exp"].(float64)
		if !ok || float64(time.Now().Unix()) > expFloat {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		userID, ok := claims["sub"].(string)
		if !ok {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		var user models.User
		if err := initializers.DB.Where("id = ?", userID).First(&user).Error; err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Set("user", user)
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
