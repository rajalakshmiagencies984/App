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
            let data=[...state.filter(s=> s.id !== action.payload)]
            AsyncStorage.removeItem("Cart");
            AsyncStorage.setItem("Cart",JSON.stringify(data))
            return state=[...data]

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
