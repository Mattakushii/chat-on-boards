import React from 'react'
import { AuthForm } from '@features/components/auth-form/auth-form'
import { WelcomeSlider } from '@features/components/welcome-slider/welcome-slider'
import styles from '@styles/patterns.module.scss'

export const AuthPage = () => {
  return (
    <div className={styles.container}>
      <WelcomeSlider />
      <AuthForm />
    </div>
  )
}
