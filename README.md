# Backend task

## Motivation

## Manually test

Into the docs folder there is the insomnia json file, which can help you to test the application.
Importing this file, all the HTTP routes will show up in your insomnia application

## Run locally

```bash
# install all dependencies
npm i

# Copy the environment variable
cp .env.example .env

# run the docker-compose
docker-compose up -d .

# run the tests (optional)
npm run test

# build the project
npm run build

# start it
npm run start:prod

```
