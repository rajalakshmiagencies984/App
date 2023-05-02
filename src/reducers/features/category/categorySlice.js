import { createSlice } from "@reduxjs/toolkit";

export const categorySlice =  createSlice({
    name:"category",
    initialState:[

    ],
    reducers:{
        getCategory:(state,action)=>{
            return state = [...action.payload]
        }
    }
})

export const {getCategory}=categorySlice.actions;

export default categorySlice.reducer