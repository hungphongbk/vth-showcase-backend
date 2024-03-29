package main

import (
	"encoding/base64"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hungphongbk/vth-showcase-backend/main/entities"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	bimg "gopkg.in/h2non/bimg.v1"
	"io"
	"net/http"
	"os"
	"path"
	"strings"
)

func (s Server) CreateThumbnail(buffer []byte) ([]byte, error) {
	size, _ := bimg.NewImage(buffer).Size()
	thumbOptions := bimg.Options{
		Width:       size.Width / 2,
		Height:      size.Height / 2,
		Quality:     65,
		Compression: 1000,
		// Interlace: true,
		GaussianBlur: bimg.GaussianBlur{
			Sigma: 40,
		},
	}
	return bimg.NewImage(buffer).Process(thumbOptions)
}
func (s Server) SaveThumbnail(buffer []byte) (string, error) {
	thumb, err := s.CreateThumbnail(buffer)
	if err != nil {
		return "", err
	}
	imgBase64Str := "data:image/webp;base64," + base64.StdEncoding.EncodeToString(thumb)
	return imgBase64Str, nil
}

func (s Server) Save(buffer []byte, Filename string) (string, error) {
	dstPath := path.Join(s.DocumentRoot, Filename)
	dstFile, err := os.OpenFile(dstPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0666)
	if err != nil {
		return "", err
	}
	defer dstFile.Close()
	if _, err := dstFile.Write(buffer); err != nil {
		return "", err
	}
	return dstPath, nil
}
func (s Server) CreateOutput(buffer []byte, Filename string) (*struct {
	buffer         []byte
	Path           string
	Width          int
	Height         int
	OriginalSize   int
	CompressedSize int
}, error) {
	options := bimg.Options{
		Quality: 80,
	}
	originalSize := len(buffer)
	converted, err := bimg.NewImage(buffer).Process(options)
	if err != nil {
		return nil, err
	}

	converted, err = bimg.NewImage(converted).Convert(bimg.WEBP)
	if err != nil {
		return nil, err
	}

	// distribute converted and compressed base64 since here

	dstPath, err := s.Save(converted, Filename)
	if err != nil {
		return nil, err
	}

	size, err := bimg.NewImage(converted).Size()
	if err != nil {
		return nil, err
	}
	compressedSize := len(converted)
	return &struct {
		buffer         []byte
		Path           string
		Width          int
		Height         int
		OriginalSize   int
		CompressedSize int
	}{buffer: converted, Path: dstPath, Width: size.Width, Height: size.Height, OriginalSize: originalSize, CompressedSize: compressedSize}, nil
}

func (s Server) post(c *gin.Context) {
	// read file & generate name
	file, _ := c.FormFile("file")
	originalFileName := file.Filename
	uuid := uuid.NewString()
	uuidFileName := fmt.Sprintf("%s.%s", uuid, "webp")

	buf, err := file.Open()
	if err != nil {
		panic(err)
	}
	buffer, err := io.ReadAll(buf)
	if err != nil {
		panic(err)
	}

	// compress & create output
	converted, err := s.CreateOutput(buffer, uuidFileName)
	if err != nil {
		panic(err)
	}
	uploadedURL := fmt.Sprintf("/assets%s", strings.TrimPrefix(converted.Path, s.DocumentRoot))

	preload, err := s.SaveThumbnail(converted.buffer)
	if err != nil {
		panic(err)
	}

	//store image into DB
	err = repository.Image.AddImage(entities.Image{
		Id:               uuid,
		OriginalFileName: originalFileName,
		Path:             uploadedURL,
		DiskPath:         converted.Path,
		Width:            converted.Width,
		Height:           converted.Height,
		OriginalSize:     converted.OriginalSize,
		CompressedSize:   converted.CompressedSize,
	})

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{
		"id":      uuid,
		"path":    uploadedURL,
		"preload": preload,
		"width":   converted.Width,
		"height":  converted.Height,
	})
}
