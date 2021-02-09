import * as log from 'https://deno.land/std/log/mod.ts';
import { getApiConfig, getDatabaseConfig, getLocalEnvConfig } from './config.ts';
import { getDbKey, createQueryString, randomizeArray } from './utils.ts';
import type { DbService } from './services/db.ts';
import type { Product, ProductDetails } from './types.ts';

export type RawProductImage = {
  cloudinary: boolean,
  src: string
};

export type RawProduct = {
  personalizable: boolean,
  division: string,
  category: string,
  sport: string,
  color: string,
  orderable: number,
  salePercentage: string,
  customBadge: string,
  isFlash: boolean,
  productType: string,
  previewTo: string,
  onlineFrom: string,
  colorVariations: Array<string>,
  sizeType: Array<string>,
  subTitle: string,
  link: string,
  unisex: boolean,
  altText: string,
  displayName: string,
  rating: number,
  ratingCount: number,
  image: RawProductImage,
  secondImage: RawProductImage,
  productId: string,
  modelId: string
};

export type RawProductsResponse = {
  itemList: {
    items: RawProduct[]
  }
};

const RATING_OPTIONS = .8;
const MAX_RATING = 5;


export async function init(db: DbService, local: boolean): Promise<void> {
  const { loadedKey } = getDatabaseConfig();
  const { url: productsUrl, types: productsTypes } = local ? getLocalEnvConfig() : getApiConfig('products');
  const { sortings } = getApiConfig('products');
  const { assetsHost } = getLocalEnvConfig();

  function createRating(rating: number | null) {
    return typeof rating === 'number'
      ? rating
      : Math.random() < RATING_OPTIONS ? Math.random() * MAX_RATING : null;
  }

  function createProductsUrl(url: string, type: string): string {
    return `${ url }?${ createQueryString({ query: type }) }`;
  }

  function createProductsPath(url: string, type: string): string {
    return `${ url }/${ type }.json`;
  }

  function getData(type: string, local: boolean): Promise<any> {
    function fetchLocalData(path: string): Promise<any> {
      return Deno.readTextFile(path).then(JSON.parse);
    }

    const url = (local ? createProductsPath : createProductsUrl)(productsUrl, type);

    return local
      ? fetchLocalData(url)
      : fetch(url).then((body: Body) => body.json());
  }

  async function loadProductType(type: string): Promise<ProductDetails[]> {
    return await getData(type, local)
    .then(({ itemList: { items } }: RawProductsResponse) => items.map(({
      productId,
      category,
      sport,
      color,
      customBadge,
      displayName,
      subTitle,
      rating,
      image: { src: imageSrc },
      secondImage: { src: secondImageSrc } = { src: '' }
    }) => ({
      productId,
      type,
      category,
      sport,
      color,
      badge: customBadge || '',
      title: displayName,
      subTitle,
      rating: createRating(rating),
      imageSrc: `${ local ? assetsHost : '' }${ imageSrc }`,
      secondImageSrc: `${ local ? assetsHost : '' }${ secondImageSrc }`
    } as ProductDetails)));
  }

  function removeProductDuplications(products: Product[]): Product[] {
    return products.reduce((uniqueProducts, product) =>
      uniqueProducts.find(({ productId: uniqueProductId }) => uniqueProductId === product.productId)
        ? uniqueProducts
        : [ ...uniqueProducts, product ], [] as Product[])
  }

  async function addProducts(db: DbService, typeProducts: ProductDetails[]): Promise<void> {
    await Promise.all(typeProducts.map((product) => {
      const { productId } = product;

      return db.set(getDbKey('product', productId), product);
    }));
  }

  async function addRangeProducts(
    db: DbService,
    typeProducts: ProductDetails[],
    typed: boolean,
    sortings: string[]
  ): Promise<void> {
    await Promise.all(typeProducts.reduce((typeProductPromises, product) => {
      const { productId, type } = product;

      return typeProductPromises.concat(sortings.reduce((rangePromises, sorting) => {
        const score = sorting ? product[sorting] || 0 : 0;
        const _type = typed ? type : '';

        return rangePromises.concat(sorting
          ? [
            db.zadd(getDbKey('products', _type, sorting, 'asc'), score, productId),
            db.zadd(getDbKey('products', _type, sorting, 'desc'), -score, productId)
          ]
          : [ db.zadd(getDbKey('products', _type), 0, productId) ]
        );
      }, [] as Promise<any>[]));
    }, [] as Promise<any>[]));
  }

  if (local) {
    log.debug('Data: flushing database products for local execution');

    await db.flushdb();
  }

  const ready = await db.get(loadedKey, false);

  if (ready !== 'OK') {
    const loadProductTypePromises: Promise<ProductDetails[]>[] = productsTypes.map(loadProductType);

    log.debug(`Data: getting products from '${ productsUrl }'`);
    log.debug(`Data: requested types '${ productsTypes.join('\', \'') }'`);

    await Promise.all(loadProductTypePromises)
    .then(async (typeProducts: ProductDetails[][]) => typeProducts.flat())
    .then(removeProductDuplications)
    .then(randomizeArray)
    .then(async (typeProducts: ProductDetails[]) => {
      await addProducts(db, typeProducts);

      return typeProducts;
    })
    .then(async (typeProducts: ProductDetails[]) => {
      await addRangeProducts(db, typeProducts, true, sortings);
      await addRangeProducts(db, typeProducts, false, sortings);

      return typeProducts;
    })
    .then((typeProducts) => {
      log.debug(`Data: products loaded successfully (${ typeProducts.length } products)`);
    })
    .then(() => {
      return db.set(loadedKey, 'OK', false);
    });
  } else {
    log.debug(`Data: products already loaded from '${ productsUrl }'`);
  }
}
