import axios from "axios";

const API = axios.create({ baseURL:"https://rs-server-18ld.onrender.com/api/"})


export const API_login = (data)=> API.post('/user/login',data)

export const API_Send_Otp =(data)=>API.post('/user/otp',data)

export const API_register = (data)=> API.post('/user/register',data)

export const API_getUser =(data)=>API.get(`/user/${data.id}`)

export const API_add_address = (data)=>API.post("/user/address",data)

export const API_getCategory = ()=>API.get('/category')

export const API_getproduct = ()=>API.get('/product')

export const API_paymentIntent =(data)=>API.post('/payment/intent',data)

export const API_newOrder =(data)=>API.post('/order',data)

export const API_MyOrder = (data)=>API.post(`/order/my`,data)

//http://10.0.2.2:5000/api/"
//http://192.168.1.7:5000/api/
