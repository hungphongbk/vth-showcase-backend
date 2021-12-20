package main

import (
	"github.com/gin-gonic/gin"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"net/http"
)

func (s Server) del(c *gin.Context) {
	id := c.Param("id")
	err := repository.Image.DeleteImageById(id)
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{})
}
