import React from 'react'

export default function Errors({children} : {children: React.ReactNode}) {
  return (
    <div className="text-red-500 font-bold pb-3 uppercase text-xs">
      {children}
    </div>
  )
}
