# Backend task

## Feature

- CREATE: create an user an send an email and send a RabbitMQ event.
- GET by id: retrieve the user from https://reqres.in
- GET avatar: retrieve the user from https://reqres.in and save the image content as base64 in the database and local
- REMOVE avatar: remove the avatar from an exiting user and delete the local file

## Manually test

Into the docs folder there is the insomnia json file, which can help you to test the application.
Importing this file, all the HTTP routes will show up in your insomnia application

# Documentation

To see more details about the application, when the app is running you can access the url: http://localhost:3000/api/documentation and see the Swagger file

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
