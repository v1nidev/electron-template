import { useTour } from '@reactour/tour';
import { useEffect } from 'react';

interface UseEarningCalcProps {
  steps: {
    selector: string
    content: string
  }[]
}

export default function useEarningCalc({ steps }: UseEarningCalcProps) {
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
    const delay = 3000
    let timer: any

    if (isOpen) {
      timer = setTimeout(
        () => setCurrentStep(setCurrentStepCallback),
        delay
      )
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isOpen, currentStep])

  return { setIsOpen }
}