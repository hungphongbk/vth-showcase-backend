package main

import "github.com/hungphongbk/vth-showcase-backend/main/env"

type Server struct {
	DocumentRoot string
	SecureToken  string
}

// NewServer creates a new simple-upload server.
func NewServer(env *env.Environment) Server {
	return Server{
		DocumentRoot: env.DocumentRoot,
		SecureToken:  env.SecureToken,
	}
}
