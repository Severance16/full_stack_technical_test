'use client'

import { ReactNode, createContext, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

export type AuthContextProviderProps = {
	children: ReactNode
}

export const AuthContext = createContext({
	Login: (authTokens: string) => {},
	Logout: () => {}
})

export default function AuthContextProvider({
	children,
}: AuthContextProviderProps) {


  const Login = (authTokens: string) => {
		Cookies.set('authTokens', authTokens)
	}

  const Logout = () => {
		Cookies.remove('authTokens')
	}

  const value = useMemo(
		() => ({
			Login,
			Logout,
		}),
		[Login, Logout],
	)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}