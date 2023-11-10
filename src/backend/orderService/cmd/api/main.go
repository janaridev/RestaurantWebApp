package main

import (
	"orderService/initializers"
	"orderService/services/product"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	product.GetAllProducts()
	router := gin.Default()

	router.GET("/api/healthCheck", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "Health Check succeed."})
	})

	router.Run(os.Getenv("SERVER_URL"))
}
