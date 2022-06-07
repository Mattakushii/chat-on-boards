import React from 'react'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

import st from './styles.scss'

type TProps = {
  name: string
  isRequired: boolean
  type: string
  placeholder: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export const Input = ({
  name,
  isRequired,
  type,
  placeholder,
  Icon,
  ...props
}: TProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={st.inputContainer}>
      <div
        className={classNames(
          st.svgContainer,
          errors[name]?.type === 'required' && st.errorSvg,
        )}
      >
        <Icon />
      </div>
      <input
        {...props}
        {...register(name, { required: isRequired })}
        placeholder={placeholder}
        className={classNames(
          st.inputLayout,
          errors[name]?.type === 'required' && st.inputError,
        )}
        type={type}
      />
      {errors[name]?.type === 'required' && (
        <p className={st.error}>This field is required</p>
      )}
    </div>
  )
}
