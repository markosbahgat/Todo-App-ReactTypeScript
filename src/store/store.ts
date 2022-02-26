import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import RootReducer from './rootReducer';
import { RootState } from './rootReducer';

export const store = configureStore({
  reducer: RootReducer,
  
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
