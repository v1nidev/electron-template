import React, { useEffect, useRef, useState } from "react";

import { input, label } from "./style.css";

interface Props {
  name?: string,
  selectedVaue: string,
  options: {
    label: string,
    value: string,
  }[],
  onChange?: (value: string) => void
}

const commomClasses = `text-sm font-medium px-8 py-3 text-zinc-500 bg-black
 hover:text-zinc-400 focus:z-10 focus:ring-2 cursor-pointer`

export default function RadioButtonGroup({
  name = 'default-radio-name',
  selectedVaue,
  options,
  onChange = () => {}
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorPosition, setIndicatorPosition] = useState(-70)

  useEffect(() => {
    const containerElement = containerRef.current
    
    if (selectedVaue && containerElement) {
      const offsetLeft = containerElement
        .querySelector(`input[value="${selectedVaue}"]`)
        ?.closest('div')
        ?.offsetLeft

      setIndicatorPosition(offsetLeft || 0)      
    }
  }, [selectedVaue])

  function handleChange(event: React.FormEvent<HTMLInputElement>) { 
    onChange((event.target as HTMLInputElement).value)
  }

  return (
    <div className={`relative inline-flex`} ref={containerRef} role="group">
      <div
        className={`
          absolute top-0 left-0 h-full
          rounded-3xl bg-white cursor-pointer ${selectedVaue ? 'opacity-100' : 'opacity-0'} 
          transition-all duration-300 ease-[cubic-bezier(0.26,0.75,.1,1.32)]
        `} 
        style={{
          transform: `translateX(${indicatorPosition}px)`,
          width: `${100 / options.length}%`
        }}
      />
      {options.map((option, index) => (
        <div key={option.value}>
          <input
            type="radio"
            name={name}
            className={`hidden ${input}`}
            id={option.value}
            value={option.value}
            onChange={handleChange}
          />
          <label
            htmlFor={option.value}
            className={`
              ${label}
              ${index === 0 ? 'rounded-l-3xl border' : ''}
              ${index === options.length - 1 ? 'rounded-r-3xl border' : ''}
              ${commomClasses}`
            }
          >
            <span className={`relative z-10 font-semibold select-none`}>{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  )
}