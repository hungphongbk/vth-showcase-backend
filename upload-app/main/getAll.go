package main

import (
	"github.com/gin-gonic/gin"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"net/http"
)

func (s Server) getAll(c *gin.Context) {
	images, err := repository.Image.GetAll()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{
		"images": images,
	})
}

func (s Server) stat(c *gin.Context) {
	size, count, err := repository.Image.DirStat()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{
		"totalFiles": count,
		"totalSize":  size,
	})
}
