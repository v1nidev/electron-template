import React, { useState } from 'react';

import { separator } from './style.css';
import AmountInput from '../shared/amout-input';
import cosmosLogo from '../shared/img/cosmos.svg';
import linkIcon from '../shared/img/icon-social-link.svg';
import RadioButtonGroup from '../shared/radio-button-group';
import { selectStaked, selectAmount } from './slice';
import { useAppSelector } from '../shared/hooks';

const options = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: 'ALL', value: '100' },
]

function App(): JSX.Element {
  const [savedAmount, setSavedAmount] = useState('')
  const [earningsAmount, setEarningsAmount] = useState('')
  const stakedList = useAppSelector(selectStaked)

  return (
    <main className='container mx-auto pt-24 px-4'>
      <header className='text-center'>
        <img width={80} height={80} src={cosmosLogo} alt='Cosmos logo' className='mx-auto' />
        <h1 className='mt-16 text-5xl'>Earn Cosmos ATOM</h1>
        <p className='mt-6 text-zinc-500'>
          Staking allows us to earn ATOM like a savings account.<br />Earnings are calculated based on your staked amount.
        </p>
      </header>

      <section>
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

        <div className='flex mt-16 justify-center'>
          <RadioButtonGroup options={options} />
        </div>

        <div className='mt-20  mx-auto max-w-2xl'>
          {stakedList.map((staked, i) => (
            <section key={i} className='flex mb-3 py-8 px-9 justify-between bg-zinc-800'>
              <p>{staked.date.toString()}</p>
              <p className='ml-2 text-right text-violet-400 opacity-75'>{staked.value} ATOM</p>
            </section>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className='px-20 py-3 text-sm font-semibold rounded-3xl bg-violet-800'>STAKE ATOM</button>
          <p className='my-3 text-sm text-zinc-500'>Netork Fee 0.0005075</p>
        </div>
      </section>

    </main>
  );
}

export default App;
