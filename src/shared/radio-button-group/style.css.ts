import { style } from '@vanilla-extract/css';

export const input = style({});

export const labelClass = style({
  selectors: {
    [`${input}:checked + &`]: {
      background: '#fff',
      color: '#000'
    }
  }
});