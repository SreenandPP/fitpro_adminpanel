import React,{createContext, useState} from 'react'

export const addWorkoutResponseContext=createContext()
export const editWorkoutResponseContext=createContext()
export const addDietResponseContext=createContext()


function Contextapi({children}) {

    const [addWorkoutResponse,setAddWorkoutResponse]=useState("")
    const [editWorkoutResponse,setEditWorkoutResponse]=useState("")
    const [addDietResponse,setAddDietResponse]=useState("")
  return (
    <>
    <addDietResponseContext.Provider value={{addDietResponse,setAddDietResponse}}>

  
    <addWorkoutResponseContext.Provider value={{addWorkoutResponse,setAddWorkoutResponse}}>
    <editWorkoutResponseContext.Provider value={{editWorkoutResponse,setEditWorkoutResponse}}>
    {children}
    </editWorkoutResponseContext.Provider>
   
    </addWorkoutResponseContext.Provider>
    </addDietResponseContext.Provider>

    </>
  )
}

export default Contextapi