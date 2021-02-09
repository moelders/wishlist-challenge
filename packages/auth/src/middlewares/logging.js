module.exports = function({ url, method }, _response, next) {
  process.stdout.write(`${ method }: ${ url }\n`);

  next();
};
