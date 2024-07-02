import React from 'react'

export const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB] bg-clip-text'>{" "}
        {text}{" "}
    </span>
  )
}
