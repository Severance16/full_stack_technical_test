'use client'

import Errors from '@/components/errors';
import clientAxios from '@/util/clientAxios';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type RegisterFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const initialValues: RegisterFormData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({defaultValues: initialValues});

  const password = watch('password');

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      const { data } = await clientAxios.post("/auth/register", formData);
      toast.success(data)
      reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error, { toastId: "login"})
      }
    }
  }

  return (
    <>
      <h1 className="text-5xl font-black text-teal-400">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-white font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-teal-600 font-bold text-xl" htmlFor="email">
            Correo
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="email"
              placeholder="Email de registro"
              className={`w-full p-3 rounded-lg ${
                errors.email ? "border-red-300" : "border-gray-300"
              } border`}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email no válido",
                },
              })}
            />
            {errors.email && <Errors>{errors.email.message}</Errors>}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-teal-600 font-bold text-xl" htmlFor="name">
            Nombre
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="name"
              placeholder="name de registro"
              className={`w-full p-3 rounded-lg ${
                errors.name ? "border-red-300" : "border-gray-300"
              } border`}
              {...register("name", {
                required: "El name es obligatorio",
              })}
            />
            {errors.name && <Errors>{errors.name.message}</Errors>}
          </div>
        </div>
        
        <div className="flex flex-col gap-5">
          <label className="text-teal-600 font-bold text-xl" htmlFor="password">
            Contraseña
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="password"
              id="password"
              placeholder="password de registro"
              className={`w-full p-3 rounded-lg ${
                errors.password ? "border-red-300" : "border-gray-300"
              } border`}
              {...register("password", {
                required: "El password es obligatorio",
              })}
            />
            {errors.password && <Errors>{errors.password.message}</Errors>}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-teal-600 font-bold text-xl" htmlFor="password_confirmation">
            Repite la Contraseña
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="password"
              id="password_confirmation"
              placeholder="password_confirmation de registro"
              className={`w-full p-3 rounded-lg ${
                errors.password_confirmation ? "border-red-300" : "border-gray-300"
              } border`}
              {...register("password_confirmation", {
                required: "Repetir contraseña es obligatorio",
                validate: value => value === password || 'Los contraseñas no  coinciden'
              })}
            />
            {errors.password_confirmation && <Errors>{errors.password_confirmation.message}</Errors>}
          </div>
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-teal-400 hover:bg-teal-600 transition-colors w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-5 flex flex-col space-y-4">
        <Link
          href={"/login"}
          className="text-teal-400 text-center"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  )
}