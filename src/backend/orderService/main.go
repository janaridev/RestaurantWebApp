package main

import (
	"orderService/initializers"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
}

func main() {
	router := gin.Default()
	router.GET("/api/healthCheck", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "Health Check succeed."})
	})
	router.Run(os.Getenv("SERVER_URL"))
}
