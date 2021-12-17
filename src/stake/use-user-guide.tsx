import { useTour } from '@reactour/tour';
import { useEffect } from 'react';

interface UseEarningCalcProps {
  steps: {
    selector: string
    content: string
  }[]
  stepDelay?: number
}

type Timeout = ReturnType<typeof setTimeout>

export default function useEarningCalc({ steps, stepDelay = 3000 }: UseEarningCalcProps) {
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()

  function setCurrentStepCallback(step: number) {
    if (step === steps.length - 1) {
      setIsOpen(false)
      return -1
    } else {
      return step + 1
    }
  }

  useEffect(() => {
    let timer: Timeout | null = null

    if (isOpen) {
      timer = setTimeout(
        () => setCurrentStep(setCurrentStepCallback),
        stepDelay
      )
    } else if (timer) {
      clearTimeout(timer)
    }

    return () => clearTimeout(timer as Timeout)
  }, [isOpen, currentStep])

  return { setIsOpen }
}