import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';

export const loadOffers = createAction('offers/loadOffers');
export const changeCity = createAction('change/changeCity', (city : City) => ({
  payload: city
}));
