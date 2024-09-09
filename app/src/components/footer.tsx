import React from 'react'

export default function Footer() {
  return (
    <footer className="py-5">
        <p className="text-center text-teal-400 font-bold text-xl">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
    </footer>
  )
}
