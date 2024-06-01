import dayjs from 'dayjs/esm';

export interface ICategory {
  id: number;
  categoryName?: string | null;
  categoryDescription?: string | null;
  createDate?: dayjs.Dayjs | null;
  lastModifyDate?: dayjs.Dayjs | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
