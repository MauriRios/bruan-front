import dayjs from 'dayjs/esm';
import { ICategory } from 'app/entities/category/category.model';

export interface IProduct {
  id: number;
  productName?: string | null;
  productDescription?: string | null;
  price?: number | null;
  image?: string | null;
  imageContentType?: string | null;
  createDate?: dayjs.Dayjs | null;
  lastModifyDate?: dayjs.Dayjs | null;
  isActive?: boolean | null;
  categories?: Pick<ICategory, 'id'>[] | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
