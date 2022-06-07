import React from 'react'

import { LoadingSpinner } from '../loading-spinner'
import styles from './styles.scss'

type TProps = {
  handleClick: () => void
  isLoading: boolean
  text: string
  classNames: string
}

export const BorderedButton = ({
  handleClick,
  isLoading,
  text,
  classNames,
  ...props
}: TProps) => {
  return (
    <button
      type="submit"
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
