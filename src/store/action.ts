import { createAction } from '@reduxjs/toolkit';
import { Comments, FullOffer, OffersInNeibourghood} from '../types/offer';
import {ListOffers} from '../types/offer';
import { AuthState } from '../const';


export const loadOffers = createAction('offers/loadOffers',(listOffers : ListOffers) => ({
  payload: listOffers
}));

export const changeSort = createAction('offers/changeSort',(currentId : number) => ({
  payload: currentId
}));

export const setDataLoadingStatus = createAction('data/setDataLoadingStatus',(isLoading : boolean) => ({
  payload: isLoading
}));

export const checkAuthorizationStatus = createAction('user/checkAuthorization',(authorizationStatus : AuthState) => ({
  payload: authorizationStatus
}));

export const setFormSendingStatus = createAction('user/setFormSendingStatus',(formSendingStatus : boolean) => ({
  payload: formSendingStatus
}));


export const changeCity = createAction('offers/changeCity', (city : string) => ({
  payload: city
}));

export const changeFullOffer = createAction('offers/changeFullOffer', (currentOffer : FullOffer) => ({
  payload: currentOffer
}));

export const changeOffers = createAction('offers/changeOffers', (listOffers : ListOffers) => ({
  payload: listOffers
}));

export const loadOfferData = createAction('offers/loadCurrentOffer', (offer : FullOffer) => ({
  payload: offer
}));

export const loadFavouriteOffers = createAction('offers/loadFavouriteOffers', (favouriteOffers : ListOffers) => ({
  payload: favouriteOffers
}));

export const loadUserEmail = createAction('offers/loadUserEmail', (email : string) => ({
  payload: email
}));

export const loadOfferComments = createAction('offers/loadCurrentOfferComments', (comments : Comments) => ({
  payload: comments
}));

export const loadOfferNeibourghood = createAction('offers/loadCurrentOfferNeibourghood', (offersInNeibourghood : OffersInNeibourghood) => ({
  payload: offersInNeibourghood
}));

