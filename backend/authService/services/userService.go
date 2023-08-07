package services

import (
	"authService/dtos"
	"authService/initializers"
	"authService/models"
	"authService/utils"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func Create(body *dtos.UserDto) error {
	var existingUser models.User
	if err := initializers.DB.Where("email = ?", body.Email).First(&existingUser).Error; err == nil {
		return errors.New("User with the same email already exists")
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("Failed to hash password")
	}

	// Create the user
	user := models.User{
		Email:    body.Email,
		Password: string(hash),
		Role:     "User",
	}

	result := initializers.DB.Create(&user)
	if result.Error != nil {
		return errors.New("Failed to create user")
	}

	return nil
}

func Login(body *dtos.UserDto) (string, error) {
	var user models.User
	if err := initializers.DB.First(&user, "email = ?", body.Email).Error; err != nil {
		return "", errors.New("Invalid email or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return "", errors.New("Invalid email or password")
	}

	ctx, client, err := utils.ConnectToRedis()
	if err != nil {
		return "", errors.New("Something went wrong: " + err.Error())
	}
	defer client.Close()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID,
		"exp":  time.Now().Add(time.Hour * 24 * 30).Unix(),
		"role": user.Role,
	})

	secret, err := client.Get(*ctx, "SECRET").Result()
	if err != nil {
		fmt.Println("Error getting key:", err)
		return "", errors.New("Failed to get key")
	}
	fmt.Println("Value:", secret)

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", errors.New("Failed to create token")
	}

	return tokenString, nil
}
