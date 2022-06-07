import React from 'react'
import { LoadingSpinner } from '@ui'

import styles from './styles.scss'

type TProps = {
  handleClick?: () => void
  isLoading: boolean
  text: string
  classNames: string
}

export const PrimaryButton = ({
  handleClick,
  isLoading,
  text,
  classNames,
}: TProps) => {
  return (
    <button
      onClick={handleClick}
      className={`${styles.buttonLayout} ${classNames}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner pathClassName={styles.spinnerColor} />
      ) : (
        text
      )}
    </button>
  )
}
