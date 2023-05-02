import { createSlice } from "@reduxjs/toolkit";

export const productSlice =  createSlice({
    name:"product",
    initialState:[

    ],
    reducers:{
        getProduct:(state,action)=>{
            return state = [...action.payload]
        }
    }
})

export const {getProduct}=productSlice.actions;

export default productSlice.reducer