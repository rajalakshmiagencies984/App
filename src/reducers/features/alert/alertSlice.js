import { createSlice } from "@reduxjs/toolkit";

export const alertSlice =createSlice({
    name:"alert",
    initialState :[
       
    ],
    reducers:{
        setAlert:(state,action)=>{
            return state=[...state,action.payload] 
        },
        deleteAlert:(state,action)=>{
            return state.filter(s=> s.id!=action.payload)
        }
    }
})

export const {setAlert,deleteAlert} = alertSlice.actions

export default alertSlice.reducer