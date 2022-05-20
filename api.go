package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func useBaseRouter(app *fiber.App) {
	app.Get("/manifest.json", func(c *fiber.Ctx) error {
		return c.SendFile("./manifest.json")
	})
	app.Static("/assets", "./assets").Name("assets")
	app.Static("/css", "./web/styles/css").Name("styles")
	app.Static("/js", "./web/js").Name("scripts")
}

func main() {
	app := fiber.New()
	useBaseRouter(app)
	log.Fatal(app.Listen(":3000"))
}
