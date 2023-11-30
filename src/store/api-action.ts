import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ListOffers } from '../types/offer';
import { APIRoute, AuthState } from '../const';
import { loadOffers, setDataLoadingStatus, changeCity, checkAuthorizationStatus } from './action';
import { AuthData, UserData } from '../types/api';
import { dropToken, saveToken } from '../services/token';

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
  async({login: email, password}, {dispatch, extra: api})=>{
    const {data: {token}} = await api.post<UserData>(APIRoute.Login,{email,password});

    saveToken(token);
    dispatch(checkAuthorizationStatus(AuthState.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(checkAuthorizationStatus(AuthState.NoAuth));
  }
);


