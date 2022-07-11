import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ReactComponent as Email } from '@assets/icons/email.svg'
import { ReactComponent as Lock } from '@assets/icons/lock.svg'
import Donut1 from '@assets/images/form-donat.png'
import { getLocalItem, setLocalItem } from '@features/helpers'
import { authRequestModel } from '@models'
import { BorderedButton, Divider, Input, Link, PrimaryButton } from '@ui'

import { LOGIN } from '../../../api'
import { routePath } from '../../../routes/route-path'
import styles from './index.module.scss'

export function AuthForm() {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN)
  const navigate = useNavigate()

  const methods = useForm()

  useEffect(() => {
    if (data) {
      setLocalItem('authToken', data?.login)
      navigate(routePath.messenger.path)
    }
  }, [data, navigate])

  useEffect(() => {
    if (getLocalItem('authToken')) {
      navigate(routePath.messenger.path)
    }
  }, [navigate])

  const onSubmit = (values: any) => {
    loginUser({ variables: { data: values } })
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form
            className={styles.formBox}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h1 className={styles.heading}>Welcome</h1>
            <Input
              name={authRequestModel.email}
              isRequired={true}
              type="text"
              placeholder="Email"
              Icon={Email}
            />
            <Input
              name={authRequestModel.password}
              isRequired={true}
              type="password"
              placeholder="Password"
              Icon={Lock}
            />
            <Link
              styles={styles.linkMargin}
              text="Forgot password?"
              url="#"
              isRightPosition
            />
            <PrimaryButton
              classNames={styles.test}
              text="Log In"
              isLoading={loading}
            />
            <p>{error?.message}</p>
          </form>
          <Divider text={'Or if you are new :)'} />

          <BorderedButton
            classNames={styles.test}
            text="Registration"
            isLoading={loading}
            handleClick={() => {}}
          />
        </div>
        <img className={styles.donut} src={Donut1} alt="donut" />
      </div>
    </FormProvider>
  )
}
