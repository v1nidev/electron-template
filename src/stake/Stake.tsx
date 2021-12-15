import React, { useEffect, useState } from 'react';

import { page, separator } from './style.css';
import AmountInput from '../shared/amount-input';
import cosmosLogo from '../shared/img/cosmos.svg';
import linkIcon from '../shared/img/icon-social-link.svg';
import RadioButtonGroup from '../shared/radio-button-group';
import { selectStaked, addStaked } from './slice';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { useTour } from '@reactour/tour';
import { getFullFormatedDate, getMonthAbbr } from '../shared/utils/date';
import { tourSteps, percentageOptions } from './config.json';
import useEarningCalc from './use-earning-calc';

function Stake(): JSX.Element {
  const { savedAmount, setSavedAmount, earningsAmount, setEarningsAmount } = useEarningCalc()
  const [selectedPercentage, setSelectedPercentage] = useState('')
  const stakedList = useAppSelector(selectStaked)
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()
  const dispatch = useAppDispatch()

  function setCurrentStepCallback(step: number) {    
    if (step === tourSteps.length - 1) {
      setIsOpen(false)
      return NaN
    } else {
      return step + 1
    }
  }

  function stake() {
    dispatch(addStaked({
      date: new Date(),
      value: savedAmount,
    }))
    setSavedAmount('')
    setEarningsAmount('')
  }

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
    <main className={`${page}  container mx-auto pt-24 px-4`}>
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
            onInput={setSavedAmount}
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
            onInput={setEarningsAmount}
          />
        </div>

        <div className='flex mt-16 justify-center'>
          <RadioButtonGroup options={percentageOptions} selectedVaue={selectedPercentage} onChange={setSelectedPercentage} />
        </div>

        <div className='mt-20 empty:mt-0 mx-auto max-w-2xl'>
          {stakedList.map((staked, i) => (
            <section key={i} className='flex mb-3 py-8 px-9 justify-between bg-zinc-800'>
              <p data-tour={`${i === 0 ? 'step-2' : ''}`}>
                {getFullFormatedDate(staked.date)}
              </p>
              <p className='ml-2 text-right text-violet-400 opacity-75'>{staked.value} ATOM</p>
            </section>
          ))}
        </div>

        <div className="mt-10 mx-auto sticky bottom-4 text-center">
          <button
            onClick={stake}
            className={`
              px-20 py-4 text-sm font-semibold rounded-3xl
              bg-gradient-to-l from-purple-500 to-pink-500 ${savedAmount ? 'opacity-100' : 'opacity-70 pointer-events-none'}
              transition-opacity transito
            `}
          >
            STAKE ATOM
          </button>
        </div>
        <div className=" text-center">
          <p className='my-3 text-sm text-zinc-500'>Netork Fee 0.0005075</p>
        </div>
      </section>
    </main>
  );
}

export default Stake;
