package routes

import (
	"auth-service/handlers"
	"auth-service/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// Setup router API
func SetupRoutes(app *fiber.App) {

	api := app.Group("/api", logger.New())
	v1 := api.Group("/v1", func(c *fiber.Ctx) error {
		c.JSON(fiber.Map{
			"message": "🐣 v1",
		})
		return c.Next()
	})

	// Auth
	auth := v1.Group("/auth")
	auth.Post("/login", handlers.Login)

	// User
	user := v1.Group("/user")
	user.Get("/:id", middleware.Protected(), handlers.GetUserByID)
	user.Post("/", handlers.RegisterUser)
	user.Delete("/:id", middleware.Protected(), handlers.DeleteUser)
}
