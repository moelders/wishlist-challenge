import { Status, Context, Request } from 'https://deno.land/x/oak/mod.ts';
import { WishlistService } from '../services/wishlist.ts';
import type { Route, RouteParams } from '../router.ts';

export function init(wishlistService: WishlistService): Route[] {
  function getUser({ headers }: Request): string {
    return headers.get('user') || '';
  }

  return [
    {
      method: 'GET',
      route: '/wishlist',
      auth: true,
      /**
       * @swagger
       * /wishlist:
       *   get:
       *     summary: Returns the list of products of the user wishlist.
       *     parameters:
       *       - in: header
       *         name: authorization
       *         required: true
       *         type: string
       *         description: User credentials in bearer format.
       *     security:
       *       - BearerAuth: []
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: List of products.
       *         schema:
       *           type: object
       *           properties:
       *             products:
       *               type: array
       *               items:
       *                 type: string
       */
      async handle({ request, response }: Context & RouteParams) {
        const products = await wishlistService.getProducts(getUser(request));

        response.status = Status.OK;
        response.body = {
          products
        };
      }
    },
    {
      method: 'PUT',
      route: '/wishlist/:productId',
      auth: true,
      /**
       * @swagger
       * /wishlist/{productId}:
       *   put:
       *     summary: Adds a new product to the user wishlist.
       *     parameters:
       *       - in: header
       *         name: authorization
       *         required: true
       *         type: string
       *         description: User credentials in bearer format.
       *     security:
       *       - BearerAuth: []
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: Product added.
       *         schema:
       *           type: object
       *           properties:
       *             productId:
       *               type: string
       */
      async handle({ request, response, params }: Context & RouteParams) {
        const { productId } = params;

        await wishlistService.addProduct(getUser(request), productId);

        response.status = Status.OK;
        response.body = {
          productId
        };
      }
    },
    {
      method: 'DELETE',
      route: '/wishlist/:productId',
      auth: true,
      /**
       * @swagger
       * /wishlist/{productId}:
       *   delete:
       *     summary: Removeds a product from the user wishlist.
       *     parameters:
       *       - in: header
       *         name: authorization
       *         required: true
       *         type: string
       *         description: User credentials in bearer format.
       *     security:
       *       - BearerAuth: []
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: Product deleted.
       *         schema:
       *           type: object
       *           properties:
       *             productId:
       *               type: string
       */
      async handle({ request, response, params }: Context & RouteParams) {
        const { productId } = params;

        await wishlistService.removeProduct(getUser(request), productId);

        response.status = Status.OK;
        response.body = {
          productId
        };
      }
    }
  ];
}
