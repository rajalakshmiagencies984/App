import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: 
    {
        name:"",
        phone:"",
        email:"",
        password:"",
        deviceId:"",
        aadhar:"xxxx xxxx xxxx",
        address:[{
          doorNo:"",
          street:"",
          city:"",
        }],
      
      
    }
  
    
  ,
  reducers: {
    getUser:(state,action)=>{
        return state={...action.payload}
    },
    deleteUser:(state,action)=>{
      return state = {
        name:"",
        phone:"",
        email:"",
        password:"",
        deviceId:"",
        aadhar:"xxxx xxxx xxxx",
        address:[{
          doorNo:"",
          street:"",
          city:"",
          _id:1
        }],
      
      }
    }
    
  },
})

export const { getUser,deleteUser} = userSlice.actions

export default userSlice.reducer