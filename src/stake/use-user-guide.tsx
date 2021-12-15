import { useTour } from '@reactour/tour';
import { useEffect } from 'react';

interface UseEarningCalcProps {
  steps: {
    selector: string
    content: string
  }[]
  stepDelay?: number
}

export default function useEarningCalc({ steps, stepDelay = 3000 }: UseEarningCalcProps) {
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
    const delay = stepDelay
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