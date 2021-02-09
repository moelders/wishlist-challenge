export type QueryParams = {
  [key: string]: string
};

export type Product = {
  productId: string,
  type: string,
  sport?: string,
  badge?: string,
  title: string,
  rating?: number,
  imageSrc: string,
};

export type ProductDetails = Product & {
  category?: string,
  color?: string,
  subTitle?: string,
  secondImageSrc?: string,
  [key: string]: any
};

export type ProductResponse = {
  total: number,
  count: number,
  page: number,
  pageSize: number,
  pages: number,
  data: {
    products: Product[]
  }
};
