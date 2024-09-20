package main

import (
	"bytes"
	_ "embed"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// Embed the Python script at compile time
//
//go:embed packages/azure-local-cli/azure_local_cli/__main__.py
var embeddedScript string

func runAzureLocalCli(args ...string) error {
	azPath, err := exec.LookPath("az")
	if err != nil || azPath == "" {
		fmt.Fprintln(os.Stderr, "Could not find az cli in PATH")
		os.Exit(1)
	}

	cmd := exec.Command(azPath, "--version")
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		fmt.Fprintln(os.Stderr, stderr.String())
		return err
	}

	pythonLocationMatch := ""
	for _, line := range strings.Split(stdout.String(), "\n") {
		if strings.HasPrefix(line, "Python location '") {
			pythonLocationMatch = strings.TrimPrefix(line, "Python location '")
			pythonLocationMatch = strings.TrimSuffix(pythonLocationMatch, "'")
			break
		}
	}

	if pythonLocationMatch == "" {
		fmt.Fprintln(os.Stderr, "Could not find python location from az cli")
		os.Exit(1)
	}

	pythonCmd := exec.Command(pythonLocationMatch, append([]string{"-c", embeddedScript}, args...)...)
	pythonCmd.Stdout = os.Stdout
	pythonCmd.Stderr = os.Stderr

	if err := pythonCmd.Run(); err != nil {
		return err
	}

	return nil
}

func main() {
	if err := runAzureLocalCli(os.Args[1:]...); err != nil {
		os.Exit(1)
	}
}
