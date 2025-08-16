import { Proffesion } from 'types/new-types';

export const getProfession = (pathname: string): Proffesion => {
  const profession = pathname.split('/')[2] as Proffesion;
  return profession;
};
