package initializers

import (
	"orderService/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.OrderHeader{}, &models.OrderDetails{})
}
