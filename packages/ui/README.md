# Wishlist Challenge: UI

Frontend application for Wishlist Coding Challenge which includes: products, wishlist and user login.

## Requirements

Tools to run the generator with their recommended versions:

- NodeJS \>= 8
- NPM \>= 5
- Docker \>= 17

## Development

The are several tools already set up to work in development mode.

### Build and serve

Build in development mode with the next features: dev server, file watcher and hot module replacement.

```
npm start
```

Will start webpack dev server on port `8080` with live reload.

### Code linting

The code is checked following the [adidas coding guidelines][adidas-coding-guidelines].

```
npm run lint
```

Tooling:

- Base configuration files, source code and test files: [ESLint][eslint].
- Style files: [stylelint][stylelint].

### Testing

[Jest][jest] is the tool used to run the tests.

```
npm run test
```

The coverage is automatically created:

- LCOV file: `/test/results/TEST_TYPE/coverage/lcov.info`.
- HTML report: `/test/results/TEST_TYPE/coverage/lcov-report`.

Only unit tests are set up by default, to run other type of tests, you have to add NPM scripts and tooling/configurations.

### Clean temporary files

The temporary files such as distributables, documentation and tests results can be removed with the `clean` task.

```
npm run clean
```

## Build for production

```
npm run build
```

Will produce minified distributables in `/dist` folder.

## Documentation

The application documentation can be generated with the `doc` task using [JSDoc][jsdoc].

```
npm run doc
```

The generated documentation is located in `/docs` folder.

## Docker

```
docker build -t wishlist-challenge-ui .
```

Use `npm run start:docker` script available on the root folder to run the application.

[adidas-coding-guidelines]: https://github.com/adidas/adidas-contribution-guidelines/wiki/Coding-style-guidelines
[jest]: https://jestjs.io/
[js-build-tools]: https://github.com/adidas/js-build-tools
[eslint]: https://eslint.org/
[jsdoc]: http://usejsdoc.org/
[stylelint]: https://stylelint.io/
