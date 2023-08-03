package main

import (
	"authService/controllers"
	"authService/initializers"
	"authService/middleware"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvInitializers()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.Run()
}
