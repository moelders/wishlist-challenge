import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';

export const SWAGGER_URL = process.env.SWAGGER_URL;

fetch(SWAGGER_URL, {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin'
})
.then((body) => body.json())
.then((spec) => {
  SwaggerUI({
    spec,
    dom_id: '#swagger',
  });
})
.catch(() => {
  console.error(`Swagger file not found in ${ SWAGGER_URL }`);
});
