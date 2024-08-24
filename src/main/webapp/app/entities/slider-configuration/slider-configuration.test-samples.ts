import dayjs from 'dayjs/esm';

import { ISliderConfiguration, NewSliderConfiguration } from './slider-configuration.model';

export const sampleWithRequiredData: ISliderConfiguration = {
  id: 15051,
};

export const sampleWithPartialData: ISliderConfiguration = {
  id: 24034,
  sliderDescription: 'confused chicory',
  createDate: dayjs('2024-08-24T11:50'),
  lastModifyDate: dayjs('2024-08-23T22:18'),
};

export const sampleWithFullData: ISliderConfiguration = {
  id: 8425,
  sliderName: 'donation and gig',
  sliderDescription: 'towards correctly commonly',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  createDate: dayjs('2024-08-24T14:04'),
  lastModifyDate: dayjs('2024-08-24T05:44'),
};

export const sampleWithNewData: NewSliderConfiguration = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
