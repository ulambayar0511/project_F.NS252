package main

import (
	"auth-service/database"
	"auth-service/models"
	"auth-service/routes"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()
	app.Use(cors.New())

	if err := database.ConnectDB(); err != nil {
		log.Panic("Can't connect database:", err.Error())
	}

	fmt.Println("Connection Opened to Database")
	database.DBConn.AutoMigrate(&models.TUsers{})
	fmt.Println("Database Migrated")

	routes.SetupRoutes(app)
	log.Fatal(app.Listen(":8080"))
}
