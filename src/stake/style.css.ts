import { style } from '@vanilla-extract/css';


export const page = style({
  ':before': {
    content: '',
    position: 'absolute',
    display: 'block',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '5000px',
    height: '50%',
    background: 'rgb(19, 19, 22)',
    clipPath: 'polygon(0% 0%, 100% 0, 100% 0%, 50% 100%, 0 0%)',
    zIndex: -1
  },
})

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