import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 30578,
  login: 'kt@SqK\\!X54\\wI5qq8\\aW',
};

export const sampleWithPartialData: IUser = {
  id: 29568,
  login: '^5ey@z8\\bJ4T',
};

export const sampleWithFullData: IUser = {
  id: 14486,
  login: 'I_',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
