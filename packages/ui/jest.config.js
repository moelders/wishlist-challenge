module.exports = (type) => ({
  ...require('build-tools-jest'),
  ...require('build-tools-babel-jest'),
  setupFilesAfterEnv: [ '<rootDir>/test/setup-tests.js' ],
  moduleFileExtensions: [ 'js', 'jsx', 'json' ],
  collectCoverage: true,
  coverageDirectory: `<rootDir>/test/results/${ type }/coverage`,
  testMatch: [ `<rootDir>/test/specs/${ type }/**/*.spec.{js,jsx}` ]
});
