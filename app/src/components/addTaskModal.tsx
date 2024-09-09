import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import Errors from "./errors";
import { TaskFormData } from "@/app/tasks/page";



type AddTaskModalProps = {
  open: boolean;
  showModal: ({ type }: {
    type: "edit" | "add";
}) => void
 handleCreateTask: (formData: TaskFormData) => Promise<void>
};

export default function AddTaskModal({ open, showModal, handleCreateTask }: AddTaskModalProps) {
  const show = open ? true : false;

  const initialValues :TaskFormData = {
      name: "",
      description: ""
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {showModal({type: "add"})}}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-10">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-teal-400">una tarea</span>
                  </p>

                  <form
                    className="mt-5 space-y-3"
                    onSubmit={handleSubmit(handleCreateTask)}
                    noValidate
                  >
                    <div className="flex flex-col gap-5">
                      <label
                        className="text-teal-600 font-bold text-xl"
                        htmlFor="email"
                      >
                        Nombre
                      </label>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          id="name"
                          placeholder="Nombre de la tarea"
                          className={`w-full p-3 rounded-lg ${
                            errors.name ? "border-red-300" : "border-gray-300"
                          } border`}
                          {...register("name", {
                            required: "El nombre es obligatorio.",
                          })}
                        />
                        {errors.name && (
                          <Errors>{errors.name.message}</Errors>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <label
                        className="text-teal-600 font-bold text-xl"
                        htmlFor="email"
                      >
                        Descripción
                      </label>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          id="description"
                          placeholder="Nombre de la tarea"
                          className={`w-full p-3 rounded-lg ${
                            errors.description ? "border-red-300" : "border-gray-300"
                          } border`}
                          {...register("description", {
                            required: "La descripcion es obligatoria.",
                          })}
                        />
                        {errors.description && (
                          <Errors>{errors.description.message}</Errors>
                        )}
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Agregar Tarea"
                      className="bg-teal-400 hover:bg-teal-600 transition-colors w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
