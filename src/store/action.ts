import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';

export const loadOffers = createAction('offers/loadOffers');
export const changeSort = createAction('offers/changeSort',(currentId : number) => ({
  payload: currentId
}));

export const changeCity = createAction('offers/changeCity', (city : City) => ({
  payload: city
}));
