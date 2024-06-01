import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'd15c8d2a-b0f5-411e-a761-32ff905fd40e',
};

export const sampleWithPartialData: IAuthority = {
  name: '60cae111-f54b-4ece-b1fb-73cbed4b3ea6',
};

export const sampleWithFullData: IAuthority = {
  name: '09608a64-fff5-421d-9a71-e86cca0c30c8',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
