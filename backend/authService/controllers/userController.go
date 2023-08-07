package controllers

import (
	"authService/dtos"
	"authService/models/responses"
	"authService/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
	var body dtos.UserDto

	if err := c.ShouldBindJSON(&body); err != nil {
		errorResponse := responses.SendErrorResponse(false, 400, "Failed to read body.")
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	err := services.Create(&body)
	if err != nil {
		errorResponse := responses.SendErrorResponse(false, 400, err.Error())
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	successResponse := responses.SendSuccessResponse(true, 201, nil)
	c.JSON(http.StatusCreated, successResponse)
}

func Login(c *gin.Context) {
	var body dtos.UserDto

	if err := c.ShouldBindJSON(&body); err != nil {
		errorResponse := responses.SendErrorResponse(false, 400, "Failed to read body.")
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	tokenString, err := services.Login(&body)
	if err != nil {
		errorResponse := responses.SendErrorResponse(false, 400, err.Error())
		c.JSON(http.StatusBadRequest, errorResponse)
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	successResponse := responses.SendSuccessResponse(true, 200, nil)
	c.JSON(http.StatusOK, successResponse)
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
