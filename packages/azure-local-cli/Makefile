default: build

install:
	poetry install --no-root

build: install
	mkdir -p dist && poetry run python -m nuitka ./azure_local_cli --output-filename=./dist/azl --remove-output --assume-yes-for-downloads

