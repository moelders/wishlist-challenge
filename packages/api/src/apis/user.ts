import { Status, Context } from 'https://deno.land/x/oak/mod.ts';
import { AuthService } from '../services/auth.ts';
import { getAuthHeaders } from '../config.ts';
import type { Route } from '../router.ts';

export function init(authService: AuthService): Route[] {
  return [
    {
      method: 'POST',
      route: '/user/login',
      auth: false,
      /**
       * @swagger
       * /user/login:
       *   post:
       *     summary: Perform the user login using basic auth (authorization header).
       *     parameters:
       *       - in: header
       *         name: authorization
       *         required: true
       *         type: string
       *         description: User credentials.
       *     security:
       *       - BasicAuth: []
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: User details.
       *         schema:
       *           $ref: '#/definitions/UserAuth'
       */
      async handle({ request, response }: Context) {
        const headers: Headers = request.headers;
        const authorization = getAuthHeaders().map((header) => headers.get(header)).find((auth) => auth);

        if (authorization) {
          const userData = await authService.login(authorization);

          response.status = Status.OK;
          response.body = userData;
        } else {
          response.status = Status.BadRequest;
          response.body = 'Unauthorized';
        }
      }
    },
    {
      method: 'POST',
      route: '/user/logout',
      auth: true,
      /**
       * @swagger
       * /user/logout:
       *   post:
       *     summary: Perform the user logout.
       *     security:
       *       - BasicAuth: []
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: OK.
       */
      async handle({ response }: Context) {
        await authService.logout();

        response.status = Status.OK;
      }
    }
  ];
}
