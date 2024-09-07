'use client'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext } from 'react'
import { AuthContext } from '../../../context/index'
import axios from 'axios'

export default function Login() {
  const { Login } = useContext(AuthContext)
	const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/login", {
        email: "sergio",
        password: "123"
      })
      Login(data)
      router.push('/tasks')
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <input name='name'> */}
        <input type='submit' value={"Loginnn"}/>
      </form>
    </div>
  )
}