package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"gopkg.in/h2non/bimg.v1"
	"net/http"
	"os"
)

func (s Server) getPng(c *gin.Context) {
	id := c.Param("id")
	img, err := repository.Image.FindById(id)
	if err != nil {
		panic(err)
	}
	dstFile, err := os.OpenFile(img.DiskPath, os.O_RDONLY, 0666)
	if err != nil {
		panic(err)
	}
	defer func(dstFile *os.File) {
		err := dstFile.Close()
		if err != nil {

		}
	}(dstFile)

	fileInfo, err := dstFile.Stat()
	if err != nil {
		fmt.Println(err)
		return
	}

	filesize := fileInfo.Size()
	buffer := make([]byte, filesize)

	_, err = dstFile.Read(buffer)
	if err != nil {
		panic(err)
	}

	converted, err := bimg.NewImage(buffer).Convert(bimg.PNG)
	if err != nil {
		panic(err)
	}
	c.Data(http.StatusOK, "image/png", converted)
}
