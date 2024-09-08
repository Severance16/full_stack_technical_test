"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../../../context/index";
import {AxiosError, isAxiosError} from "axios";
import clientAxios from "@/util/clientAxios";
import { useForm } from "react-hook-form";
import Errors from "@/components/errors";
import { toast } from "react-toastify";
import Link from "next/link";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { Login } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const { data } = await clientAxios.post("/auth/login", formData);
      console.log(data)
      Login(data);
      router.push("/tasks");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error, { toastId: "login"})
      }
    }
  };

  return (
    <>
      <h1 className="text-5xl font-black text-teal-400">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-white mt-5">
        Comienza a planear tus tareas {""}
      </p>
      <form
        className="space-y-8 p-10 mt-10 bg-white rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
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
          <label className="text-teal-600 font-bold text-xl" htmlFor="password">
            Contraseña
          </label>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              id="password"
              placeholder="Password de Registro"
              className={`w-full p-3 rounded-lg ${
                errors.password ? "border-red-300" : "border-gray-300"
              } border`}
              {...register("password", {
                required: "La contraseña es obligatoria.",
              })}
            />
            {errors.password && <Errors>{errors.password.message}</Errors>}
          </div>
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-teal-400 hover:bg-teal-600 transition-colors w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-5 flex flex-col space-y-4">
        <Link 
          href={"/register"}
          className="text-teal-400 text-center"
        >
          ¿No tienes cuenta? Registrate
        </Link>
      </nav>
    </>
  );
}
