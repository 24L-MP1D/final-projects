import { ProductType } from './productType';

export type BidType = {
  bid: number;
  userId: string;
  productId: string;
  createdAt: Date;
  userInfo: {
    email: string;
    firstName: string;
  }[];
  email: string;

  productInfo: ProductType[];

  _id: string;
};
