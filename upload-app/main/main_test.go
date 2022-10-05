package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/entities"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"io"
	"mime/multipart"
	"net/http/httptest"
	"os"
	"path"
	"testing"

	"github.com/Netflix/go-env"
)

func setup() {
	uploadPath, _ := os.Getwd()
	os.Setenv("UPLOAD_PATH", path.Join(uploadPath, "../test/output"))
	os.Setenv("UPLOAD_PGHOST", "207.148.126.213")
	os.Setenv("UPLOAD_PGPORT", "5433")
	os.Setenv("UPLOAD_PGDB", "upload_test")

	environ := os.Environ()
	env.EnvironToEnvSet(environ)
}
func teardown() {
	var images []entities.Image
	err := db.Connection.Model((*entities.Image)(nil)).Select(&images)
	if err != nil {
		panic(err)
	}
	for _, image := range images {
		err = repository.Image.DeleteImage(image)
		if err != nil {
			panic(err)
		}
	}
}
func TestMain(m *testing.M) {
	setup()
	exitVal := m.Run()

	os.Exit(exitVal)
}

// testcases implementations
func DoUploadFile(t *testing.T, r *gin.Engine) string {
	pr, pw := io.Pipe()
	writer := multipart.NewWriter(pw)

	cwd, _ := os.Getwd()

	go func() {
		defer writer.Close()
		part, err := writer.CreateFormFile("file", "input.png")
		if err != nil {
			t.Error(err)
		}
		dat, err := os.ReadFile(path.Join(cwd, "../test/input.png"))
		if err != nil {
			t.Error(err)
		}
		_, err = part.Write(dat)
		if err != nil {
			t.Error(err)
		}
	}()

	request := httptest.NewRequest("POST", "/upload", pr)
	request.Header.Add("Content-Type", writer.FormDataContentType())
	response := httptest.NewRecorder()
	r.ServeHTTP(response, request)

	t.Log("It should respond with an HTTP status code of 200")
	if response.Code != 200 {
		t.Errorf("Expected %d, received %d %s", 200, response.Code, response.Body.String())
	}

	result := struct {
		Id string
	}{}
	err := json.NewDecoder(response.Body).Decode(&result)
	if err != nil {
		t.Errorf("Cannot decode json body")
	}
	//fmt.Printf("%+v", result)
	return result.Id
}
func TestUploadImage(t *testing.T) {
	r := setupRouter()

	pr, pw := io.Pipe()
	writer := multipart.NewWriter(pw)

	cwd, _ := os.Getwd()

	go func() {
		defer writer.Close()
		part, err := writer.CreateFormFile("file", "input.png")
		if err != nil {
			t.Error(err)
		}
		dat, err := os.ReadFile(path.Join(cwd, "../test/input.png"))
		if err != nil {
			t.Error(err)
		}
		_, err = part.Write(dat)
		if err != nil {
			t.Error(err)
		}
	}()

	request := httptest.NewRequest("POST", "/upload", pr)
	request.Header.Add("Content-Type", writer.FormDataContentType())
	response := httptest.NewRecorder()
	r.ServeHTTP(response, request)

	t.Log("It should respond with an HTTP status code of 200")
	if response.Code != 200 {
		t.Errorf("Expected %d, received %d %s", 200, response.Code, response.Body.String())
	}

	teardown()
}

func TestDeleteImage(t *testing.T) {
	r := setupRouter()

	id := DoUploadFile(t, r)
	request := httptest.NewRequest("DELETE", fmt.Sprintf("/upload/%s", id), nil)
	response := httptest.NewRecorder()
	r.ServeHTTP(response, request)
	t.Log("It should respond with an HTTP status code of 200")
	if response.Code != 200 {
		t.Errorf("Expected %d, received %d %s", 200, response.Code, response.Body.String())
	}
}
