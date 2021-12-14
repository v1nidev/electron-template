import React, { useEffect, useState } from 'react';

import { page, separator } from './style.css';
import AmountInput from '../shared/amount-input';
import cosmosLogo from '../shared/img/cosmos.svg';
import linkIcon from '../shared/img/icon-social-link.svg';
import RadioButtonGroup from '../shared/radio-button-group';
import { selectStaked, addStaked } from './slice';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { useTour } from '@reactour/tour';
import { getMonthAbbr } from '../shared/utils/date';
import steps from './tutorial.json';
import { getPrecision } from '../shared/utils/number';

const apyPercentage = 10.0377
const apyMultiplier = apyPercentage / 100
const options = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: 'ALL', value: '100' },
]

function Stake(): JSX.Element {
  const [savedAmount, setSavedAmount] = useState<string>('')
  const [earningsAmount, setEarningsAmount] = useState<string>('')
  const [selectedPercentage, setSelectedPercentage] = useState('')
  const stakedList = useAppSelector(selectStaked)
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()
  const dispatch = useAppDispatch()

  function setCurrentStepCallback(step: number) {    
    if (step === steps.length - 1) {
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
    reset()
  }

  function reset() {
    setSavedAmount('')
    setEarningsAmount('')
  }
    
  function handleSavedAmountInput(value: string) {
    if (['', '0'].includes(value)) {
      reset()
      return
    }

    const savedAmountAsFloat = parseFloat(value as string)
    const earnings = savedAmountAsFloat * apyMultiplier + savedAmountAsFloat
    
    setSavedAmount(value)
    setEarningsAmount(getPrecision(earnings) > 6
      ? earnings.toFixed(6)
      : earnings.toString())
  }

  function handleEarningsInput(value: string) {
    if (['', '0'].includes(value)) {
      reset()
      return
    }

    const earningsAmountAsFloat = parseFloat(value as string)
    const neededSavedAmount = earningsAmountAsFloat / (apyMultiplier + 1)
    
    setEarningsAmount(value)
    setSavedAmount(getPrecision(neededSavedAmount) > 6
      ? neededSavedAmount.toFixed(6)
      : neededSavedAmount.toString())
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
            onInput={handleSavedAmountInput}
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
            onInput={handleEarningsInput}
          />
        </div>

        <div className='flex mt-16 justify-center'>
          <RadioButtonGroup options={options} selectedVaue={selectedPercentage} onChange={setSelectedPercentage} />
        </div>

        <div className='mt-20 empty:mt-0 mx-auto max-w-2xl'>
          {stakedList.map((staked, i) => (
            <section key={i} className='flex mb-3 py-8 px-9 justify-between bg-zinc-800'>
              <p data-tour={`${i === 0 ? 'step-2' : ''}`}>
                {getMonthAbbr(staked.date)}
                &nbsp;{staked.date.getDate()},
                &nbsp;{staked.date.getFullYear()}
                &nbsp;{staked.date.getHours() || '00'}:{staked.date.getMinutes() || '00'}:{staked.date.getSeconds() || '00'}
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
