import { Status, Context } from 'https://deno.land/x/oak/mod.ts';
import { getQuery } from 'https://deno.land/x/oak/helpers.ts'
import { ProductService } from '../services/products.ts';
import type { Route, RouteParams } from '../router.ts';

export function init(productsService: ProductService): Route[] {
  return [
    {
      method: 'GET',
      route: '/products',
      auth: false,
      /**
       * @swagger
       * /products:
       *   get:
       *     summary: Returns a list of products (filtered by type, paginated, and sorted).
       *     parameters:
       *       - in: query
       *         name: type
       *         required: false
       *         type: string
       *         description: Type of product.
       *       - in: query
       *         name: page
       *         required: false
       *         type: number
       *         description: Selected page of the paginated list.
       *       - in: query
       *         name: sorting
       *         required: false
       *         type: string
       *         description: Sorting in format 'productProperty|sorting' ('asc', 'desc', and '' as sorting).
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: List of products.
       *         schema:
       *           type: array
       *           items:
       *             $ref: '#/definitions/Product'
       */
      async handle(context: Context) {
        const { response } = context;
        const { type = '', page = '1', sorting = '' } = getQuery(context);

        const productData = await productsService.getProducts(type, +page, sorting);

        response.status = Status.OK;
        response.body = productData;
      }
    },
    {
      method: 'GET',
      route: '/products/:productId',
      auth: false,
      /**
       * @swagger
       * /products/{productId}:
       *   get:
       *     summary: Returns the product details by its product identifier.
       *     parameters:
       *       - in: path
       *         name: productId
       *         required: true
       *         type: string
       *         description: Product identifier.
       *     produces:
       *       application/json
       *     responses:
       *       200:
       *         description: Product details.
       *         schema:
       *           $ref: '#/definitions/ProductDetails'
       */
      async handle({ response, params }: Context & RouteParams) {
        const { productId } = params;

        const product = await productsService.getProduct(productId);

        response.status = Status.OK;
        response.body = product;
      }
    }
  ];
}
