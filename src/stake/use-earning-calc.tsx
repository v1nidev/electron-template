import { useState } from 'react';
import { getPrecision } from '../shared/utils/number';

const apyPercentage = 10.0377
const apyMultiplier = apyPercentage / 100

export default function useEarningCalc() {
  const [savedAmount, _setSavedAmount] = useState<string>('')
  const [earningsAmount, _setEarningsAmount] = useState<string>('')
  
  function reset() {
    _setSavedAmount('')
    _setEarningsAmount('')
  }

  function setSavedAmount(value: string) {
    if (['', '0'].includes(value)) {
      reset()
      return
    }

    const savedAmountAsFloat = parseFloat(value as string)
    const earnings = savedAmountAsFloat * apyMultiplier + savedAmountAsFloat

    _setSavedAmount(value)
    _setEarningsAmount(getPrecision(earnings) > 6
      ? earnings.toFixed(6)
      : earnings.toString())
  }

  function setEarningsAmount(value: string) {
    if (['', '0'].includes(value)) {
      reset()
      return
    }

    const earningsAmountAsFloat = parseFloat(value as string)
    const neededSavedAmount = earningsAmountAsFloat / (apyMultiplier + 1)

    _setEarningsAmount(value)
    _setSavedAmount(getPrecision(neededSavedAmount) > 6
      ? neededSavedAmount.toFixed(6)
      : neededSavedAmount.toString())
  }

  return { savedAmount, setSavedAmount, earningsAmount, setEarningsAmount }
}