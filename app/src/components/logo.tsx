import Image from 'next/image'
import React from 'react'
import image from "../public/logo.png"

export default function Logo() {
  return (
    <Image src={image} width={100} height={100} alt="Logo Tasks"/>
  )
}
