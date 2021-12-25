package repository

import (
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/entities"
	"github.com/hungphongbk/vth-showcase-backend/main/env"
	"os"
	"path/filepath"
)

type ImageRepository struct {
	env *env.Environment
}

var Image = &ImageRepository{}

func (repo *ImageRepository) Init(e *env.Environment) {
	repo.env = e
}
func (repo *ImageRepository) findById(id string) (*entities.Image, error) {
	img := new(entities.Image)
	err := db.Connection.Model(img).Where("id = ?", id).Select()
	if err != nil {
		return nil, err
	}
	return img, nil
}
func (repo *ImageRepository) GetAll() ([]entities.Image, error) {
	var images []entities.Image
	err := db.Connection.Model(&images).Order("created_at DESC").Select()
	if err != nil {
		return nil, err
	}
	return images, nil
}
func (repo *ImageRepository) AddImage(i entities.Image) error {
	_, err := db.Connection.Model(&i).Insert()
	if err != nil {
		return err
	}
	return nil
}

func (repo *ImageRepository) DeleteImage(i entities.Image) error {
	_, err := db.Connection.Model(&i).WherePK().Delete()
	if err != nil {
		return err
	}
	//after delete
	err = os.Remove(i.DiskPath)
	if err != nil {
		return err
	}
	return nil
}
func (repo *ImageRepository) DeleteImageById(id string) error {
	img, err := repo.findById(id)
	if err != nil {
		return err
	}
	return repo.DeleteImage(*img)
}
func (repo *ImageRepository) DirStat() (int64, int, error) {
	var size int64
	var count int
	err := filepath.Walk(repo.env.DocumentRoot, func(_ string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			size += info.Size()
			count++
		}
		return err
	})
	return size, count, err
}
