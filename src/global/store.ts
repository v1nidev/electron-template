import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stakeReducer from '../stake/slice';

export const store = configureStore({
  reducer: {
    stake: stakeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;