package handlers

import (
	"auth-service/database"
	"auth-service/models"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)
	if err != nil {
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))

	if uid != n {
		return false
	}

	return true
}

// GetUserByID is a function to get user data by ID from database
func GetUserByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	user := new(models.TUsers)
	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}
	if err := db.First(&user, id).Error; err != nil {
		switch err.Error() {
		case "record not found":
			return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "User with ID not found.", "data": nil})
		default:
			return c.Status(http.StatusServiceUnavailable).JSON(fiber.Map{"status": "error", "message": err.Error(), "data": nil})
		}
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Product found", "data": user})
}

// RegisterUser registers a new module data
func RegisterUser(c *fiber.Ctx) error {
	type NewUser struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	db := database.DBConn
	user := new(models.TUsers)

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	user.Password = hash
	if err := db.Create(&user).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	newUser := NewUser{
		Email:    user.Email,
		Username: user.Username,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Created user", "data": newUser})
}

// Deleteuser function removes a user by ID
func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	user := new(models.TUsers)
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Invalid token id", "data": nil})
	}

	if err := db.First(&user, id).Error; err != nil {
		switch err.Error() {
		case "record not found":
			return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Discount with ID not found.", "data": nil})
		default:
			return c.Status(http.StatusServiceUnavailable).JSON(fiber.Map{"status": "error", "message": err.Error(), "data": nil})
		}
	}

	db.Delete(&user)
	return c.JSON(fiber.Map{"status": "success", "message": "User successfully deleted", "data": nil})
}
