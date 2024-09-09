import Link from 'next/link'
import React from 'react'
import Logo from './logo'

export default function Header() {
  return (
    <header className="bg-gray-800 border-b-2 border-gray-400 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64 ml-10">
            <Link href="/" className=''>
              <Logo />
            </Link>
          </div>
        </div>
      </header>
  )
}
