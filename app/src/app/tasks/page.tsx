"use client";

import AddTaskModal from "@/components/addTaskModal";
import EditTaskModal from "@/components/editTaskModal";
import TaskDetail from "@/components/taskDetail";
import clientAxios from "@/util/clientAxios";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type TTaskDetail = {
  _id: string;
  delegate: {
    _id: string;
    email: string;
    name: string;
  };
  description: string;
  name: string;
  responsible: {
    _id: string;
    email: string;
    name: string;
  };
  status: "pending" | "In progress" | "Finished";
  updatedAt: string;
  createdAt: string;
};

export type TaskFormData = {
  name: string;
  description: string;
  responsible?: string;
};

export default function Task() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [taskUpdate, setTaskUpdate] = useState<TTaskDetail>();
  const [tasks, setTasks] = useState<TTaskDetail[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      console.log("llega al delete", id);
      const { data } = await clientAxios.delete<string>(`/tasks/${id}`);
      toast.success(data);
      const updateTasks = tasks.filter((taskState) => taskState._id !== id);
      setTasks(updateTasks);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await clientAxios<TTaskDetail[]>("/tasks");
      console.log(data);
      setTasks(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const handleCreateTask = async (formData: TaskFormData) => {
    try {
      const { data } = await clientAxios.post("/tasks", formData);
      toast.success(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  const handleUpdateTask = async (formData: TaskFormData) => {
    try {
      const { data } = await clientAxios.put(`/tasks/${taskId}`, formData);
      const updatedTasks = tasks.map((taskState) => {
        if (taskState._id === taskId) {
          return {
            ...taskState,
            name: formData.name,
            description: formData.description,
          };
        }
        return taskState;
      });
      setTasks(updatedTasks);
      toast.success(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  const changeTaskId = (id: string) => {
    setTaskId(id);
  };

  const showModal = ({ type }: { type: "edit" | "add" }) => {
    if (type === "add") {
      setAddTask(!addTask);
    } else if (type === "edit") {
      setEditTask(!editTask);
      if (editTask === true) {
        setTaskId("");
        setTaskUpdate(undefined)
      }
    }
  };

  const getDataTask = async () => {
    try {
      const { data } = await clientAxios<TTaskDetail>(`/tasks/${taskId}`);
      setTaskUpdate(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  useEffect(() => {
    if (taskId !== "") {
      getDataTask();
    }
  }, [editTask]);

  return (
    <>
      <div className="flex flex-row justify-around">
        <h2 className="text-teal-400 text-center text-4xl font-bold">
          Lista de Tareas
        </h2>
        <button
        className="border rounded-lg border-teal-400 text-teal-400 font-semibold p-2"
          onClick={() => {
            showModal({ type: "add" });
          }}
        >
          Agregar Tarea +
        </button>
      </div>
      {tasks?.length < 0 ? (
        <p>No tienes tareas.</p>
      ) : (
        tasks?.map((task) => (
          <TaskDetail
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            setTaskId={changeTaskId}
            showModal={showModal}
          />
        ))
      )}
      <AddTaskModal
        open={addTask}
        showModal={showModal}
        handleCreateTask={handleCreateTask}
      />
      {taskUpdate !== undefined && <EditTaskModal
        id={taskId}
        taskData={taskUpdate}
        open={editTask}
        showModal={showModal}
        handleUpdateTask={handleUpdateTask}
      />}
      
    </>
  );
}
