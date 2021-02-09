# Wishlist Challenge: auth

Authentication service for Wishlist Coding Challenge which allows login, logout and validation.

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

## API

The API request authorization uses [JSONWebToken][jwt] in the header request.

There are three options to add the authorization header:

- `authorization`.
- `Authorization`.
- `WWW-Authenticate`.

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
docker build -t wishlist-challenge-auth .
```

Use `npm run start:docker` script available on the root folder to run the application.

[deno]: https://deno.land
[deno-install]: https://deno.land/#installation
[denon]: https://github.com/denosaurs/denon
[jwt]: https://tools.ietf.org/html/rfc7519
