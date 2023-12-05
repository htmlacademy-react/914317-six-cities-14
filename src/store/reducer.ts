import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeCity, changeSort, setDataLoadingStatus, checkAuthorizationStatus, loadOfferData, loadOfferComments, loadOfferNeibourghood, loadFavouriteOffers, loadUserEmail, changeFullOffer, changeOffers } from './action';
import { Comments, FullOffer, ListOffers, OffersInNeibourghood } from '../types/offer';
import { City } from '../types/offer';
import { findCity, sortOffers } from '../utils/utils';
import { AuthState } from '../const';
import { FavouriteOffers } from '../types/favourite-offer';
import { addCurrentOffer } from '../components/Offer/offer-utils';

type InitialState = {
  userEmail: string;
  offers: ListOffers;
  favouriteOffers: FavouriteOffers;
  city: City;
  filtredOffers: ListOffers;
  isDataLoading: boolean;
  authorizationStatus: AuthState;
  currentOffer: FullOffer;
  currentOfferComments: Comments;
  offersNeibourghood: OffersInNeibourghood;
};

const initialState: InitialState = {
  userEmail: '',
  offers: [],
  favouriteOffers: [],
  city: {
    name: '',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
  filtredOffers: [],
  isDataLoading: false,
  authorizationStatus: AuthState.Unknown,
  currentOffer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [''],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    images: [''],
    maxAdults: 0,
  },
  currentOfferComments: [],
  offersNeibourghood: []
};

export const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setDataLoadingStatus, (state, action) => {
        state.isDataLoading = action.payload;
      })
      .addCase(changeCity, (state, action) => {
        state.city = findCity(action.payload);
      })
      .addCase(loadOffers, (state, action) => {
        state.offers = action.payload;
        state.filtredOffers = action.payload;
      })
      .addCase(changeSort, (state, action) => {
        state.filtredOffers = sortOffers(action.payload, state.offers);
      })
      .addCase(loadOfferData, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(loadUserEmail, (state, action) => {
        state.userEmail = action.payload;
      })
      .addCase(loadFavouriteOffers, (state, action) => {
        state.favouriteOffers = action.payload;
      })
      .addCase(changeFullOffer, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(changeOffers, (state, action) => {
        state.filtredOffers = action.payload;
        state.offers = action.payload;
      })
      .addCase(loadOfferNeibourghood, (state, action) => {
        state.offersNeibourghood = addCurrentOffer(action.payload,state.offers,state.currentOffer.id);
      })
      .addCase(loadOfferComments, (state, action) => {
        state.currentOfferComments = action.payload;
      })
      .addCase(checkAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      });
  });

