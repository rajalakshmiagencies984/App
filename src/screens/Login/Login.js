import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useLayoutEffect, useState} from 'react'
import colors from '../../../colors'
import FormHeader from '../../components/FormHeader/FormHeader'
import {Text as TextRP,TextInput,Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import {v4 as uuidv4} from 'uuid'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import { getUser } from '../../reducers/features/user/userSlice'
import { API_login } from '../../api'
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {

  const [email,setEmail]=useState("karthirajendran12003@gmail.com");
  const [password,setPassword]=useState("karthi12003")
  const [deviceId,setDeviceID]=useState("");
  const dispatch = useDispatch();
  const handleLogin = ()=>{
        navigation.navigate("Register")
  }
  useLayoutEffect(()=>{
        const getDeviceId =async()=>{
           let device= await OneSignal.getDeviceState()   
            setDeviceID(device.userId)
      }
      getDeviceId()
    },[])

  const handleSubmit = async()=>{
      let id = uuidv4();
      if(email.length==0){
        dispatch(setAlert(Object({id,msg:"Email Cannot be empty"})))
        setTimeout(()=>{
            dispatch(deleteAlert(id));
        },3000)
        return
      }
      if(password.length==0){
        dispatch(setAlert(Object({id,msg:"Password Cannot be empty"})))
        setTimeout(()=>{
            dispatch(deleteAlert(id));
        },3000)
        return
      }

      dispatch(setLoading(true))
      try {
        const {data}= await API_login({email,password,deviceId});
        AsyncStorage.setItem("Agencies",JSON.stringify({...data}))
        const user=data.user;
        dispatch(getUser(Object({...user})))
        dispatch(setAlert(Object({id,msg:"Login Successfull"})))
        setTimeout(()=>{
          dispatch(deleteAlert(id))
        },5000)
        navigation.replace("Loading")

      } catch (error) {
        dispatch(setAlert(Object({id,msg:"Try After some Time"})))
        setTimeout(()=>{
          dispatch(deleteAlert(id))
        },5000)
      }
      dispatch(setLoading(false))
  }

  return (
    <View style={styles.container}>
        <View style={styles.form}>
          <FormHeader/>
          <Text style={styles.loginHead}>Login</Text>
          <TextInput 
                  mode="flat"
                  label="Email"
                  placeholder="Enter your Email" 
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input} />
          <TextInput 
                  mode="flat"
                  label="Password"
                  placeholder="Enter your Password" 
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
                  style={styles.input} />

          <Button textColor={colors.black} style={styles.button} onPress={handleSubmit}  mode="outlined" >
                    Login
            </Button>
            <View style={styles.bottom}>
                   
                       <TextRP variant="bodyLarge">Don't have an acccount</TextRP>
                        <TouchableOpacity onPress={handleLogin}>   
                        <TextRP variant='bodyLarge' style={styles.login}>Register</TextRP>
                      </TouchableOpacity> 
                </View> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
    justifyContent:"center",
    alignItems:"center"
  },
  form:{
    borderColor:colors.peacock,
    borderRadius:24,
    borderStyle:"solid",
    borderWidth:3,
    backgroundColor:colors.white,
    padding:24,
    width:"80%",
  },
  loginHead:{
    textAlign:"center",
    margin:12,
    fontSize:18,
    fontWeight:600,
    color:colors.green,
    fontWeight:700
  },
  input:{
    borderColor:"#ffed07",
    backgroundColor:"#FFF",
    color:"black",
    borderBottomColor:"#212529",
    borderBottomWidth:1,
    marginVertical:2,
  },
  button:{
    backgroundColor:colors.yellow,
    color:colors.white,
    marginVertical:12,
    },
    bottom:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      gap:6,
    },
    login:{
      fontWeight:"bold",
      color:colors.peacock
    }
})

export default Login