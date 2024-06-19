import { commonApi } from "./commonApi"
import base_url from "./server_url"

//register

export const adminRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/adminregister`,data,"")
}

//login

export const adminLogin=async(data)=>{
    return await commonApi("POST",`${base_url}/adminlogin`,data,"")
}

//add-workout

export const addWorkout=async(data,header)=>{
    return await commonApi("POST",`${base_url}/addworkout`,data,header)
}

//allworkouts

export const allWorkouts=async(header)=>{
    return await commonApi("GET",`${base_url}/allworkouts`,"",header)
}

//deleteworkout

export const deleteWorkout=async(id,header)=>{
    return await commonApi('DELETE',`${base_url}/delete-workout/${id}`,{},header)
}

//add-diet

export const addDiet=async(data,header)=>{
    return await commonApi("POST",`${base_url}/adddiet`,data,header)
}

//alldiet

export const allDiets=async(header)=>{
    return await commonApi("GET",`${base_url}/alldiets`,"",header)
}

//editworkout

export const editWorkout=async(id,data,header)=>{
    return  await commonApi("PUT",`${base_url}/editworkout/${id}`,data,header)
}

//deletedietplan

export const deleteDiet=async(id,header)=>{
    return await commonApi('DELETE',`${base_url}/delete-diet/${id}`,{},header)
}

//editdiet

export const editDiet=async(id,data,header)=>{
    return  await commonApi("PUT",`${base_url}/editdiet/${id}`,data,header)
}


