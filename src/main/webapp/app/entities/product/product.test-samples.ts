import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 7642,
};

export const sampleWithPartialData: IProduct = {
  id: 32214,
  productName: 'yet borrower unless',
  price: 15385.87,
  isActive: false,
};

export const sampleWithFullData: IProduct = {
  id: 20640,
  productName: 'blissfully',
  productDescription: 'harness',
  price: 23037.71,
  createDate: dayjs('2024-05-25T10:56'),
  lastModifyDate: dayjs('2024-05-25T14:25'),
  isActive: true,
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
