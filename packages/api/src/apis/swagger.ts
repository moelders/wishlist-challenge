import { Status, Context } from 'https://deno.land/x/oak/mod.ts';
import { swaggerDoc } from "https://deno.land/x/deno_swagger_doc/mod.ts";
import type { Route, RouteParams } from '../router.ts';

export function init(options: any): Route[] {
  const swaggerDocumentation = swaggerDoc(options);

  return [
    {
      method: 'GET',
      route: '/swagger.json',
      auth: false,
      /**
       * @swagger
       * /swagger:
       *   get:
       *     summary: Returns the API documentation (swagger format).
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: Swagger file.
       */
      async handle({ response }: Context & RouteParams) {
        response.status = Status.OK;
        response.body = swaggerDocumentation;
      }
    }
  ];
}
