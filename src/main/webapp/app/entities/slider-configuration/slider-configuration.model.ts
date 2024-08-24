import dayjs from 'dayjs/esm';

export interface ISliderConfiguration {
  id: number;
  sliderName?: string | null;
  sliderDescription?: string | null;
  image?: string | null;
  imageContentType?: string | null;
  createDate?: dayjs.Dayjs | null;
  lastModifyDate?: dayjs.Dayjs | null;
}

export type NewSliderConfiguration = Omit<ISliderConfiguration, 'id'> & { id: null };
