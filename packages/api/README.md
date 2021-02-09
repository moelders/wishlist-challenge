# Wishlist Challenge: API

API for Wishlist Coding Challenge which includes: products, wishlist and user login.

The service is running with [Deno][deno].

## Setup

- Install [`deno`][deno-install].
- Install [`denon`][denon] proccess to run the application in development mode:
  ```
  deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
  ```

## Running

```
deno run -A Drakefile.ts run
```

## Development

- Run application (with file watchers):
  ```
  deno run -A Drakefile.ts run:watch
  ```

### Typings

Types come by default with [Deno][deno], however, they have to be regenerated anytime it is updated.

- Create a `/typings` folder.
- Run:
  ```
  deno types > typings/deno.d.ts
  ```

## Docker

```
docker build -t wishlist-challenge-api .
```

Use `npm run start:docker` script available on the root folder to run the application.

## Redis

Run Redis server

```
docker run -d -p 6379:6379 --name redis-demo redis
docker start redis-demo
docker exec -it redis-demo sh

# redis-cli
```

[deno]: https://deno.land
[deno-install]: https://deno.land/#installation
[denon]: https://github.com/denosaurs/denon
