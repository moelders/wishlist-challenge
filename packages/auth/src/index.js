const { Buffer } = require('buffer');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sign, verify } = require('jsonwebtoken');
const corsMiddleware = require('./middlewares/cors');
const loggingMiddleware = require('./middlewares/logging');
const ldap = require('./services/ldap');
const { getError } = require('./errors');

dotenv.config();

const { PORT, JWT_SECRET, JWT_EXPIRATION, LDAP_HOST, LDAP_PORT } = process.env;

const app = express();

app.use(corsMiddleware);
app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (request, response) => {
  const { headers } = request;
  const authorization = [ 'authorization', 'Authorization', 'WWW-Authenticate' ]
    .map((header) => headers[header])
    .find((auth) => auth);

  if (authorization) {
    const [ , credentials ] = authorization.split(' ');
    const [ user, pass ] = Buffer.from(credentials, 'base64').toString().split(':');
    const [ domain, userName ] = user.split('\\');

    ldap(LDAP_HOST, LDAP_PORT, domain)
    .getUser(userName, pass)
    .then(({ userName, fullName, mail }) => {
      const token = sign({ userName, fullName, mail }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

      response.send({
        userName,
        fullName,
        mail,
        token
      });
    })
    .catch(({ code, message }) => {
      response.status(500).send({
        code,
        error: message
      });
    });
  } else {
    const { code, message } = getError('unauthorized');

    response.status(401).send({
      code,
      error: message
    });
  }
});

app.post('/logout', (_request, response) => {
  response.end();
});

app.get('/verify', (request, response) => {
  const { headers } = request;
  const authorization = [ 'authorization', 'Authorization', 'WWW-Authenticate' ]
    .map((header) => headers[header])
    .find((auth) => auth);
  const [ , token ] = authorization.split(' ');

  verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      const { code, message } = getError('invalidToken');

      response.status(401).json({
        code,
        error: message
      });
    } else {
      response.send({
        ...decoded
      });
    }
  });
});

app.listen(PORT);

process.stdout.write(`Auth service started at 'http://localhost:${ PORT }'\n`);
