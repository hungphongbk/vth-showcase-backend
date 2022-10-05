package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/h2non/bimg.v1"
	"io"
	"net/http"
	"strings"
)

func (s Server) postStatic(c *gin.Context) {
	file, _ := c.FormFile("file")
	originalFileName := file.Filename

	buf, err := file.Open()
	if err != nil {
		panic(err)
	}
	buffer, err := io.ReadAll(buf)
	if err != nil {
		panic(err)
	}

	options := bimg.Options{
		Quality: 75,
	}
	// compress & create output
	converted, err := bimg.NewImage(buffer).Process(options)
	if err != nil {
		panic(err)
	}
	dstPath, err := s.Save(converted, originalFileName)
	if err != nil {
		panic(err)
	}
	uploadedURL := fmt.Sprintf("/assets%s", strings.TrimPrefix(dstPath, s.DocumentRoot))

	c.JSON(http.StatusOK, gin.H{
		"path": uploadedURL,
	})
}
