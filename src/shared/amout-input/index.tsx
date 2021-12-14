import React from "react";

interface Props {
  label: string
  value: string | number
  align?: 'left' | 'center' | 'right'
  onInput: (value: string) => void
}

const regex = /^[0-9]*\.?[0-9]*$/;

export default function AmountInput({
  label,
  align = 'left',
  value,
  onInput,
  ...otherProps
}: Props & Omit<React.HTMLProps<HTMLInputElement>, 'onInput'>) {
  const classes = align === 'right'
    ? 'items-end'
    : ''

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const { value } = (e.target as HTMLInputElement)

    if (regex.test(value))
      onInput(value)
  }

  return (
    <label className={`flex flex-col ${classes}`}>
      <span className='text-sm text-zinc-500'>{label}</span>
      <input
        {...otherProps}
        type='text'
        inputMode='numeric'
        className={`mt-4 text-7xl text-violet-400 opacity-75 placeholder:text-violet-400
          ${align === 'right' ? 'text-right' : ''}`}
        placeholder="0.00"
        value={value || ''}
        onInput={handleInput}
      />
    </label>
  )  
}