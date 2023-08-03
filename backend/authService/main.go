package main

import (
	"authService/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvInitializers()
	initializers.ConnectToDb()
}

func main() {
	r := gin.Default()
	
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}
