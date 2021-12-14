import React, { useEffect, useState } from 'react';

import { separator } from './style.css';
import AmountInput from '../shared/amout-input';
import cosmosLogo from '../shared/img/cosmos.svg';
import linkIcon from '../shared/img/icon-social-link.svg';
import RadioButtonGroup from '../shared/radio-button-group';
import { selectStaked, selectAmount } from './slice';
import { useAppSelector } from '../shared/hooks';
import { useTour } from '@reactour/tour';
import { getMonthAbbr } from '../shared/utils/date';
import steps from './tutorial.json';


const apyPercentage = 10.0377
const apyMultiplier = apyPercentage / 100
const options = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: 'ALL', value: '100' },
]

function Stake(): JSX.Element {
  const [savedAmount, setSavedAmount] = useState<string | number>('')
  const [earningsAmount, setEarningsAmount] = useState<string | number>('')
  const stakedList = useAppSelector(selectStaked)
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()

  function setCurrentStepCallback(step: number) {    
    if (step === steps.length - 1) {
      setIsOpen(false)
      return NaN
    } else {
      return step + 1
    }
  }

  useEffect(() => {
    const savedAmountAsFloat = parseFloat(savedAmount as string)

    setEarningsAmount(savedAmountAsFloat * apyMultiplier + savedAmountAsFloat)
  }, [savedAmount])

  useEffect(() => {
    const savedEarningsAmount = parseFloat(earningsAmount as string)

    setSavedAmount(savedEarningsAmount / (apyMultiplier + 1))
  }, [earningsAmount])

  useEffect(() => {
    const wasGuided = window.localStorage.getItem("was-guided")
    const delay = 3000
    let timer: any
    
    if (isOpen) {
      timer = setTimeout(
        () => setCurrentStep(setCurrentStepCallback),
        delay
      )
    }

    if (!wasGuided) {
      window.localStorage.setItem("was-guided", 'true')
      setIsOpen(true)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen, currentStep])

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
            data-tour='step-1'
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
              <p data-tour={`${i === 0 ? 'step-2' : ''}`}>
                {getMonthAbbr(staked.date)}
                &nbsp;{staked.date.getDate()},
                &nbsp;{staked.date.getFullYear()}
                &nbsp;{staked.date.getHours()}:{staked.date.getMinutes()}:{staked.date.getSeconds()}

              </p>
              <p className='ml-2 text-right text-violet-400 opacity-75'>{staked.value} ATOM</p>
            </section>
          ))}
        </div>

        <div className="mt-10 mx-auto sticky bottom-4 text-center">
          <button className=' px-20 py-3 text-sm font-semibold rounded-3xl bg-violet-800'>STAKE ATOM</button>
        </div>
        <div className=" text-center">
          <p className='my-3 text-sm text-zinc-500'>Netork Fee 0.0005075</p>
        </div>
      </section>
    </main>
  );
}

export default Stake;
