package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/api/healthCheck", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "Health Check succeed."})
	})
	router.Run("localhost:3050")
}
