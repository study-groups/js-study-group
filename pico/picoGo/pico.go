package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Assuming PICO_ROOT is set and points to the root directory where 'picoUi/picox/dist' is located.
	picoRoot := os.Getenv("PICO_ROOT")
	if picoRoot == "" {
		panic("PICO_ROOT environment variable is not set.")
	}

	distPath := picoRoot + "/picoUi/picox/dist"

	// Define picoGroup as a route group.
	picoGroup := router.Group("/")
	picoGroup.Static("/", distPath)

	router.Run(":8080")
}
