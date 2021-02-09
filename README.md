# Wishlist Challenge

This project includes several services:

- API.
- Authentication server.
- Frontend application.
- Redis database.

This is a mono-repository with all the required services for the challenge. See the available packages in the `./packages` folder.

[Lerna][lerna] is used to run the scripts of all available packages.

## Installation

There are different tools required to run all the services:

- [NodeJS and NPM][node].
- [Deno][deno].
- [Redis][redis].
- [Docker][docker].

Install dependencies and package dependencies by running:

```
npm install
npm run setup
```

## Building

The building script is performing the build of every package:

```
npm run build
```

For the packages, the output will be compiled into the `dist/` folder.

## Running

[Docker][docker] with [Docker Compose][docker-compose] are used to run all services.

The Docker commands can be run with NPM scripts:

- Building the Docker images:
  ```
  npm run build:docker
  ```
  - Running Docker Compose:
  ```
  npm run start:docker
  ```
  - Stopping Docker Compose:
  ```
  npm run stop:docker
  ```

## Development

This mono-repository is using [Lerna][lerna] and it has been configured to run all the scripts inside every package directly from the main project scripts:

- Setup (setup Lerna and install package dependencies).
- Building (build the packages and the Storybook documentation).
- Code linting.
- Documentation (generate package documentation).
- Tests.

The script to develop this project is building and watching for source code changes inside every package as well as inside the documentation folder to be able to reload the distribution files automatically.

```
npm run start
```

## Code linting

The source code is linted using the [adidas linter configurations][adidas-js-linter-configs]

```
npm run lint
```

_Note:_ it is mandatory to fix all the issues before pushing the code.

## FAQ

### Maintainers

Check the contributor list and you will be welcome if you want to contribute.

## License

[MIT](./LICENSE)

[adidas-js-linter-configs]: https://github.com/adidas/js-linter-configs
[deno]: https://deno.land
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[lerna]: https://lerna.js.org
[less]: http://lesscss.org/
[MIT]: https://opensource.org/licenses/MIT
[node]: https://nodejs.org/
[redis]: https://redis.io/
[single-page-application]: https://en.wikipedia.org/wiki/Single-page_application
[sketch]: https://www.sketch.com/
[storybook]: https://storybook.js.org/
[terms-and-conditions]: https://github.com/adidas/adidas-contribution-guidelines/wiki/Terms-and-conditions
