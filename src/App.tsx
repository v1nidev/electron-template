import React from 'react';
import { TourProvider } from '@reactour/tour'

import { themeClass } from './index.css';
import Stake from './stake/Stake';
import { tourSteps } from './stake/config.json';

const radius = 10
const tourStyles = {
  popover: (base: any) => ({
    ...base,
    '--reactour-accent': '#5b21b6',
    borderRadius: radius,
  }),
  maskArea: (base: any) => ({ ...base, rx: radius }),
  badge: (base: any) => ({ ...base, left: 'auto', right: '-0.8125em' }),
  controls: (base: any) => ({ ...base, marginTop: 100 })
}

function App(): JSX.Element {
  return (
    <TourProvider steps={tourSteps} styles={tourStyles}>
      <div className={`${themeClass}`}>
        <Stake />
      </div>
    </TourProvider>
  );
}

export default App;
