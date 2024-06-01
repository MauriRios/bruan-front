import dayjs from 'dayjs/esm';

import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 15573,
};

export const sampleWithPartialData: ICategory = {
  id: 6084,
  categoryName: 'drat vacantly consequently',
  createDate: dayjs('2024-05-25T00:49'),
};

export const sampleWithFullData: ICategory = {
  id: 19034,
  categoryName: 'unaccountably yahoo',
  categoryDescription: 'devour divorce',
  createDate: dayjs('2024-05-25T14:54'),
  lastModifyDate: dayjs('2024-05-25T01:31'),
};

export const sampleWithNewData: NewCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
