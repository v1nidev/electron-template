import { globalStyle, createTheme, style } from '@vanilla-extract/css';

globalStyle(`
html,
body,
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre
`, {
  margin: 0
});

globalStyle(`
h1,
h2,
h3,
h4,
h5,
h6
`, {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});

export const exampleStyle = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: 'white',
  padding: 10
});