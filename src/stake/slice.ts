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
  staked: []
};

export const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    addStaked(state, action) {
      state.staked.push(action.payload)
    }
  }
})

export const { addStaked } = stakeSlice.actions;
export const selectAmount = (state: RootState) => state.stake.amount;
export const selectStaked = (state: RootState) => state.stake.staked;

export default stakeSlice.reducer;