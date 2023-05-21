import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import AddAddress from "../../../components/AddAddress/AddAddress";


export const cartSlice = createSlice({
    name:"cart",
    initialState:[

    ],
    reducers:{
        getCart:(state,action)=>{
            return state=[...action.payload]
        },
        addCart:(state,action)=>{
            return state=[...state,action.payload]
        },
        deleteCart:(state,action)=>{
            return state=[]

        },
        addItem:(state,action)=>{
            const id=action.payload
            const idx = state.findIndex(s=> s.id==id);
            let price=state[idx].price;
            let quantityOfProducts=state[idx].quantityOfProducts;
            state[idx].quantityOfProducts=quantityOfProducts+1;
            state[idx].totalAmount=price*(quantityOfProducts+1)
            return state;

        },
        deleteItem:(state,action)=>{
            const id=action.payload
            const idx = state.findIndex(s=> s.id==id);
            let price=state[idx].price;
            let quantityOfProducts=state[idx].quantityOfProducts;
            state[idx].quantityOfProducts=quantityOfProducts-1;
            state[idx].totalAmount=price*(quantityOfProducts-1)

            return state;
        }
    }
})

export const {getCart,addCart,deleteCart,addItem,deleteItem}=cartSlice.actions

export default cartSlice.reducer
