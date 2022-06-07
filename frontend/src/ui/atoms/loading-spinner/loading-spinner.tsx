import React from 'react'
import classNames from 'classnames'

import st from './styles.scss'

type TProps = {
  pathClassName: string
}

export const LoadingSpinner = ({ pathClassName }: TProps) => (
  <svg className={st.spinner} viewBox="0 0 50 50">
    <circle
      className={classNames(st.path, pathClassName)}
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
    />
  </svg>
)
