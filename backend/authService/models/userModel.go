package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       string `gorm:"type:uuid;default:gen_random_uuid()"`
	Email    string `gorm:"unique"`
	Password string
	Role     string // Admin/User
}
