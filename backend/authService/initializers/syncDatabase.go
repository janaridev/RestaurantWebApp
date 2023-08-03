package initializers

import (
	"authService/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}