package initializers

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	var err error
	dsn := os.Getenv("DB_CONNECTION")
	DB, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil && DB != nil {
		panic("Failed to conned to db.")
	} else {
		log.Println("Connected to db.")
	}
}
