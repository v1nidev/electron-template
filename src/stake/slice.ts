import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../global/store';

export interface StakeState {
  value: number;
}

const initialState: StakeState = {
  value: 0,
};

export const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    reducerExample(state) {
      state.value += 1;
    }
  }
})

export const { reducerExample } = stakeSlice.actions;
export const selectExample = (state: RootState) => state.stake.value;

export default stakeSlice.reducer;