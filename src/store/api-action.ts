import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Comments, FullOffer, ListOffers, OffersInNeibourghood, offerFavorite, userComment } from '../types/offer';
import { APIRoute, AuthState } from '../const';
import { loadOffers, setDataLoadingStatus, changeCity, checkAuthorizationStatus, loadOfferData, loadOfferComments, loadOfferNeibourghood, loadFavouriteOffers, loadUserEmail, setFormSendingStatus } from './action';
import { AuthData, OfferId, UserData } from '../types/api';
import { dropToken, saveToken } from '../services/token';

export const getFavouriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getFavouriteOffersData',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ListOffers>(APIRoute.Favorite);
    dispatch(loadFavouriteOffers(data));
  }
);

export const fetchListOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchListOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));
    const { data } = await api.get<ListOffers>(APIRoute.Offers);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(changeCity('Paris'));
    dispatch(getFavouriteOffersAction());
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(checkAuthorizationStatus(AuthState.Auth));
    } catch {
      dispatch(checkAuthorizationStatus(AuthState.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(checkAuthorizationStatus(AuthState.Auth));
    dispatch(loadUserEmail(email));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(checkAuthorizationStatus(AuthState.NoAuth));
  }
);

export const getOfferDataAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getOfferData',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    dispatch(loadOfferData(data));
  }
);

export const postCommentAction = createAsyncThunk<void, userComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {

    dispatch(setFormSendingStatus(true));
    try {

      await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });

      dispatch(setFormSendingStatus(false));

      const { data } = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
      dispatch(loadOfferComments(data));

    } catch {

      dispatch(setFormSendingStatus(false));

    }
  }
);

export const postFavoriteAction = createAsyncThunk<void, offerFavorite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postFavorite',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);

    const { data } = await api.get<ListOffers>(APIRoute.Favorite);
    dispatch(loadFavouriteOffers(data));
  }
);

export const getOfferCommentsAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getOfferComments',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    dispatch(loadOfferComments(data));
  }
);

export const getOfferNeibourghoodAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getOfferNeibourghoods',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<OffersInNeibourghood>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadOfferNeibourghood(data));
  }
);


