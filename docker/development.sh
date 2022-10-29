#!/bin/bash

IMG_NAME="ech445-development"

# prepare image
docker build -f ./development.dockerFile -t $IMG_NAME .

# install dependencies
docker run --rm -it -v $(pwd)/../:/app $IMG_NAME yarn

# run server
docker run -p 4200:4200 -v $(pwd)/../:/app $IMG_NAME yarn nx serve