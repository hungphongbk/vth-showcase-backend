package main

import (
	"fmt"
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/env"
	"net/http"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	environment := new(env.Environment)
	err := environment.Init()
	if err != nil {
		return nil
	}
	server := NewServer(environment)
	db.InitDb(environment)

	r := gin.Default()
	r.Use(gin.Logger())

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	r.Use(gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
		if err, ok := recovered.(string); ok {
			c.String(http.StatusInternalServerError, fmt.Sprintf("error: %s", err))
		}
		c.AbortWithStatus(http.StatusInternalServerError)
	}))
	r.Static("/assets", environment.DocumentRoot)
	r.POST("/upload", server.post)
	r.DELETE("/upload/:id", server.del)

	return r
}

func main() {
	r := setupRouter()
	r.Run(":25478") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
