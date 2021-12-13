import { style } from '@vanilla-extract/css';
import { vars } from "../index.css";

export const separator = style({
  padding: '4vw',
  selectors: {
    '&:before, &:after': {
      content: '',
      position: 'absolute',
      display: 'block',
      width: 1,
      height: '30%',
      background: '#fff',
      right: '50%'
    },
    '&:before': {
      top: 0
    },
    '&:after': {
      bottom: 0
    },
  }
});