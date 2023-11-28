import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';
import {ListOffers} from '../types/offer';

export const loadOffers = createAction('offers/loadOffers',(listOffers : ListOffers) => ({
  payload: listOffers
}));

export const changeSort = createAction('offers/changeSort',(currentId : number) => ({
  payload: currentId
}));

export const setDataLoadingStatus = createAction('data/setDataLoadingStatus',(isLoading : boolean) => ({
  payload: isLoading
}));


export const changeCity = createAction('offers/changeCity', (city : City) => ({
  payload: city
}));
