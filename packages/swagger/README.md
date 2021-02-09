# Wishlist Challenge: Swagger server

Swagger server for Wishlist Coding Challenge.

## Requirements

Tools to run the generator with their recommended versions:

- NodeJS \>= 8
- NPM \>= 5
- Docker \>= 17

## Build and serve

Build in development mode with the next features: dev server, file watcher and hot module replacement.

```
npm start
```

Will start webpack dev server on port `8082` with live reload.

## Build for production

```
npm run build
```

Will produce minified distributables in `/dist` folder.

## Docker

```
docker build -t wishlist-challenge-ui .
```

Use `npm run start:docker` script available on the root folder to run the application.
