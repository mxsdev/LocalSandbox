package main

import (
	"log"
	"os"
	"os/exec"
	"path"
	"runtime"
)

func main() {
	// execute local file
	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}

	ext := ""

	// if on windows
	if runtime.GOOS == "windows" {
		ext = ".exe"
	}

	execPath := path.Join(path.Dir(ex), "localsandbox"+ext)

	// check if localsandbox exists
	if _, err := os.Stat(execPath); os.IsNotExist(err) {
		log.Fatal("localsandbox executable not found")
	}

	// forward execution to execPath with args
	cmd := exec.Command(execPath, os.Args[1:]...)
	cmd.Env = append(os.Environ(), "LOCALSANDBOX_AZ_LOCAL=true")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin
	err = cmd.Run()

	if err != nil {
		panic(err)
	}
}
