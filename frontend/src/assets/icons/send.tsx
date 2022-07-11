import React from 'react'

export const Send = ({
  width = '16',
  height = '16',
  color = '#cbcbcb',
}: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M18.07 8.509l-8.56-4.28c-5.75-2.88-8.11-.52-5.23 5.23l.87 1.74c.25.51.25 1.1 0 1.61l-.87 1.73c-2.88 5.75-.53 8.11 5.23 5.23l8.56-4.28c3.84-1.92 3.84-5.06 0-6.98zm-3.23 4.24h-5.4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.4c.41 0 .75.34.75.75s-.34.75-.75.75z"
    />
  </svg>
)
