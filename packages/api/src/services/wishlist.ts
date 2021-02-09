import type { DbService } from './db.ts';

export type Wishlist = Array<string>;

export type WishlistService = {
  getProducts(userId: string): Promise<Wishlist>,
  addProduct(userId: string, productId: string): Promise<void>,
  removeProduct(userId: string, productId: string): Promise<void>
};

export async function init(db: DbService): Promise<WishlistService> {
  function getDbKey(userId: string) {
    return `wishlist:${ userId }`;
  }

  async function getWishlist(userId: string): Promise<Wishlist> {
    const key = getDbKey(userId);

    return await db.get(key) || [];
  }

  return {
    async getProducts(userId: string): Promise<Wishlist> {
      return await getWishlist(userId);
    },
    async addProduct(userId: string, productId: string): Promise<void> {
      const wishlist = await getWishlist(userId);
      const productIndex = wishlist.indexOf(productId);

      if (productIndex < 0) {
        await db.set(getDbKey(userId), wishlist.concat(productId));
      }
    },
    async removeProduct(userId: string, productId: string): Promise<void> {
      const wishlist = await getWishlist(userId);
      const productIndex = wishlist.indexOf(productId);

      if (productIndex >= 0) {
        await db.set(getDbKey(userId), wishlist.slice(0, productIndex).concat(wishlist.slice(productIndex + 1)));
      }
    }
  }
}
