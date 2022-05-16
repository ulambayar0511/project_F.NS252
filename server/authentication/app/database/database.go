package database

import (
	"auth-service/config"
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DBConn   *gorm.DB
	user     = config.Config("DB_USER")
	password = config.Config("DB_PASSWORD")
	host     = config.Config("DB_HOST")
	port     = config.Config("DB_PORT")
	db       = config.Config("DB_NAME")
)

func ConnectDB() error {
	var err error

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user,
		password,
		host,
		port,
		db)

	DBConn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return err
	}

	sqlDB, err := DBConn.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(50)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return nil
}
