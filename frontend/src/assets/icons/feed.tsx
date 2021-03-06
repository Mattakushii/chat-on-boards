import React from 'react'

export const FeedIcon = ({
  width = '16',
  height = '16',
  color = 'white',
}: React.ComponentProps<'svg'>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7 9.5H17"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14.5H14"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
