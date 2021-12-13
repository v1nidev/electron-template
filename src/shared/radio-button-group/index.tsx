import React from "react";

import { input, labelClass } from "./style.css";

interface Props {
  name?: string,
  options: {
    label: string,
    value: string,
  }[],
}

const commomClasses = `text-sm font-medium px-8 py-3 text-zinc-500 bg-black
 hover:text-zinc-400 focus:z-10 focus:ring-2`

export default function RadioButtonGroup({
  name = 'default-radio-name',
  options,
}: Props) {
  return (
    <div className={`inline-flex rounded-4xl`} role="group">
      {options.map((option, index) => (
        <div key={option.value}>
          <input type="radio" name={name} className={`hidden ${input}`} id={option.value} />
          <label
            htmlFor={option.value}
            className={`
              ${labelClass}
              ${index === 0 ? 'rounded-l-3xl border' : ''}
              ${index === options.length - 1 ? 'rounded-r-3xl border' : ''}
              ${commomClasses}`
            }
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}