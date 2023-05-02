import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:"order",
    initialState:[

    ],
    reducers:{
        getOrders:(state,action)=>{
            return state =[...action.payload]
        },
        addOrder:(state,action)=>{
            return state=[...state,action.payload]
        }
    }
})

export const {getOrders,addOrder}=orderSlice.actions

export default orderSlice.reducer