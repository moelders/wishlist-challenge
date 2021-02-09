import { getApiConfig } from '../config.ts';
import { getDbKey } from '../utils.ts';
import type { Product, ProductDetails, ProductResponse } from '../types.ts';
import type { DbService } from './db.ts';

export type ProductService = {
  getProduct(key: string): Promise<ProductDetails>,
  getProducts(type?: string, page?: number, sorting?: string): Promise<ProductResponse>
};

const { pageSize } = getApiConfig('products');

export async function init(db: DbService): Promise<ProductService> {
  return {
    async getProduct(productId: string): Promise<ProductDetails> {
      return await db.get(getDbKey('product', productId)) as ProductDetails;
    },
    async getProducts(type: string = '', page: number = 1, sorting: string = ''): Promise<ProductResponse> {
      const startIndex = (page - 1) * pageSize;
      const stopIndex = startIndex + pageSize - 1;
      const [ sortingType, direction ] = sorting.split('|');
      const dbKey = getDbKey('products', type, sortingType, direction);

      return db.zrange(dbKey, startIndex, stopIndex)
      .then((productIds: string[]) =>
        Promise.all(productIds.map((productId) => db.get(getDbKey('product', productId)))))
      .then((products: ProductDetails[]) => products.map(({
        productId,
        type,
        sport,
        badge,
        title,
        rating,
        imageSrc
      }) => ({
        productId,
        type,
        sport,
        badge,
        title,
        rating,
        imageSrc
      } as Product)))
      .then(async (products: Product[]) => {
        const total = await db.zcount(dbKey);

        return {
          total,
          count: products.length,
          page,
          pageSize,
          pages: Math.ceil(total / pageSize),
          data: {
            products
          }
        };
      });
    }
  }
}
