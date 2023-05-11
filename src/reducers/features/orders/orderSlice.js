import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:"order",
    initialState:[
    ],
    reducers:{
        setOrder:(state,action)=>{
          return state=[...action.payload]
        },
        addOrder:(state,action)=>{
            return state=[...state,action.payload]
        }
    }
})

export const {setOrder,addOrder}=orderSlice.actions

export default orderSlice.reducer
