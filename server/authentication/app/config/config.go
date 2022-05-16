package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func Config(key string) string {
	// Configure .env in production
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Println("error load .env file")
	}

	return os.Getenv(key)
}
