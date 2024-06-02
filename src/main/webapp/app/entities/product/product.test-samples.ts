import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 7642,
};

export const sampleWithPartialData: IProduct = {
  id: 26963,
  productName: 'slim sometimes gah',
  price: 28492.14,
  lastModifyDate: dayjs('2024-05-25T09:42'),
};

export const sampleWithFullData: IProduct = {
  id: 9474,
  productName: 'but',
  productDescription: 'past',
  price: 18956.85,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  createDate: dayjs('2024-05-25T14:25'),
  lastModifyDate: dayjs('2024-05-25T22:30'),
  isActive: true,
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
