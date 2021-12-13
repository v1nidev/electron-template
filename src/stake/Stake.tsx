import React, { useState } from 'react';

import { separator } from './style.css';
import AmountInput from '../shared/amout-input';
import cosmosLogo from '../shared/img/cosmos.svg';
import linkIcon from '../shared/img/icon-social-link.svg';

function App(): JSX.Element {
  const [savedAmount, setSavedAmount] = useState('')
  const [earningsAmount, setEarningsAmount] = useState('')

  return (
    <main className='container lg:mx-auto pt-24 px-4'>
      <header className='text-center'>
        <img width={80} height={80} src={cosmosLogo} alt='Cosmos logo' className='mx-auto' />
        <h1 className='mt-16 text-5xl'>Earn Cosmos ATOM</h1>
        <p className='mt-6 text-zinc-500'>
          Staking allows us to earn ATOM like a savings account.<br />Earnings are calculated based on your staked amount.
        </p>
      </header>

      <div className='mt-16 flex items-center'>
        <AmountInput
          label='ENTER THE AMOUNT'
          value={savedAmount}
          align='right'
          min={0}
          maxLength={9}
          onInput={(value: string) => setSavedAmount(value)}
        />
        <div className={`${separator} relative opacity-10`}>
          <img width={36} height={36} src={linkIcon} alt='' />
        </div>
        <AmountInput
          label='BALANCE IN 1 YEAR'
          value={earningsAmount}
          align='left'
          min={0}
          maxLength={9}
          onInput={(value: string) => setEarningsAmount(value)}
        />        
      </div>
    </main>
  );
}

export default App;
