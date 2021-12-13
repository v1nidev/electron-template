import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../global/store';

export interface StakeState {
  amount: number
  staked: {
    date: Date
    value: number
  }[]
}

const initialState: StakeState = {
  amount: 0,
  staked: [
    {
      date: new Date(),
      value: 3215.00533,
    },
    {
      date: new Date(2019, 11, 17, 3, 24, 0),
      value: 653532,
    },
  ]
};

export const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    reducerExample(state) {
      state.amount += 1;
    }
  }
})

export const { reducerExample } = stakeSlice.actions;
export const selectAmount = (state: RootState) => state.stake.amount;
export const selectStaked = (state: RootState) => state.stake.staked;

export default stakeSlice.reducer;