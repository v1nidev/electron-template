import { style } from '@vanilla-extract/css';
import { vars } from "../index.css";

export const exampleStyle = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: 'white',
  padding: 10
});