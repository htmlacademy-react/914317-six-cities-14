import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ListOffers } from '../types/offer';
import { APIRoute } from '../const';
import { loadOffers, setDataLoadingStatus,changeCity } from './action';

export const fetchListOffersAction = createAsyncThunk<void,undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchListOffers',
  async (_arg,{dispatch, extra: api})=>{
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<ListOffers>(APIRoute.Offers);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(changeCity('Paris'));
  }
);
