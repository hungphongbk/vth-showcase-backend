package db

import (
	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/hungphongbk/vth-showcase-backend/main/entities"
	"github.com/hungphongbk/vth-showcase-backend/main/env"
)

var Connection *pg.DB

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*entities.Image)(nil),
	}
	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
func InitDb(e *env.Environment) *pg.DB {
	if Connection != nil {
		return Connection
	}
	opt := e.OrmConfig()
	db := pg.Connect(&opt)
	err := createSchema(db)
	if err != nil {
		panic(err)
	}

	Connection = db
	return Connection
}
