package repository

import (
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/entities"
	"os"
)

type ImageRepository struct {
}

var Image = &ImageRepository{}

func (repo *ImageRepository) findById(id string) (*entities.Image, error) {
	img := new(entities.Image)
	err := db.Connection.Model(img).Where("id = ?", id).Select()
	if err != nil {
		return nil, err
	}
	return img, nil
}
func (repo *ImageRepository) AddImage(i entities.Image) error {
	_, err := db.Connection.Model(&i).Insert()
	if err != nil {
		return err
	}
	return nil
}

func (repo *ImageRepository) DeleteImage(i entities.Image) error {
	//before delete
	err := os.Remove(i.DiskPath)
	if err != nil {
		return err
	}
	_, err = db.Connection.Model(&i).WherePK().Delete()
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
