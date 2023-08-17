package utils

import (
	"context"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
)

func ConnectToRedis() (*context.Context, *redis.Client, error) {
	ctx := context.Background()

	address := os.Getenv("CACHE")
	password := os.Getenv("CACHE_PASSWORD")
	client := redis.NewClient(&redis.Options{
		Addr:     address,
		DB:       0,
		Password: password,
	})

	pong, err := client.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		return nil, nil, err
	}
	fmt.Println("Connected to Redis:", pong)

	value, err := client.Get(ctx, "SECRET").Result()
	if err != nil {
		fmt.Println("Error getting key:", err)
		return nil, nil, err
	}
	fmt.Println("Value:", value)

	return &ctx, client, nil
}
