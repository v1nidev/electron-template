import { style } from '@vanilla-extract/css';

export const input = style({});

export const label = style({
  selectors: {
    [`${input}:checked + &`]: {
      color: '#000',
      transition: 'color 200ms cubic-bezier(0.16, 0.26, 0.52, 1.44)'
    },
  }
});