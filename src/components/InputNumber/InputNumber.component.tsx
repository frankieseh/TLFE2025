import styles from './InputNumber.module.css'

interface InputNumberProps {
  name: string
  value?: number | string
  onChange?: (value: number) => void
  placeholder?: string
  min?: number
  step?: number
  disabled?: boolean
  pattern?: string
}

export const InputNumber = ({
  name,
  value,
  onChange,
  placeholder = '',
  min = 0,
  step = 0.01,
  disabled = false,
  pattern,
}: InputNumberProps) => {
  return (
    <input
      className={styles.input_number}
      type="number"
      name={name}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      step={step}
      disabled={disabled}
      inputMode="decimal"
      pattern={pattern}
    />
  )
}
