import React from 'react'
import styles from './Button.module.css'

type IButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: IButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`${styles.button} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)
