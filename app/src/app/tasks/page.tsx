"use client"

import clientAxios from '@/util/clientAxios'
import React, { useEffect } from 'react'

export default function Task() {

  useEffect(() => {
    getTasks()
  },[])
  
  const getTasks = async () => {
    const { data } = await clientAxios("/tasks")
    console.log(data) 
  }
  return (
    <div>page</div>
  )
}
