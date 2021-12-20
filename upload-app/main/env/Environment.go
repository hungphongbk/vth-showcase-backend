package env

import (
	"github.com/Netflix/go-env"
	"github.com/go-pg/pg/v10"
)

type Environment struct {
	DocumentRoot string `env:"UPLOAD_PATH,default=/var/root"`
	SecureToken  string `env:"UPLOAD_HOST_TOKEN"`

	ORM struct {
		Host     *string `env:"UPLOAD_PGHOST"`
		Port     *string `env:"UPLOAD_PGPORT,default=5432"`
		User     *string `env:"UPLOAD_PGUSER,default=postgres"`
		Password *string `env:"UPLOAD_PGPASS,default=postgres"`
		Database *string `env:"UPLOAD_PGDB,default=upload"`
	}
}

func (e *Environment) Init() error {
	_, err := env.UnmarshalFromEnviron(e)
	if err != nil {
		return err
	}
	return nil
}

func (e Environment) OrmConfig() pg.Options {
	return pg.Options{
		Addr:     *e.ORM.Host + ":" + *e.ORM.Port,
		User:     *e.ORM.User,
		Password: *e.ORM.Password,
		Database: *e.ORM.Database,
	}
}
