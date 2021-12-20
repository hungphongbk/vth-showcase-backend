package entities

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/go-pg/pg/v10"
)

type Image struct {
	Id               string `pg:",pk"`
	OriginalFileName string
	Path             string
	DiskPath         string
	CreatedAt        time.Time `pg:"default:now()"`
}

var _ pg.BeforeDeleteHook = (*Image)(nil)

func (i *Image) BeforeDelete(ctx context.Context) (context.Context, error) {
	os.Remove(i.DiskPath)
	fmt.Printf("%+v", *i)
	return ctx, nil
}
