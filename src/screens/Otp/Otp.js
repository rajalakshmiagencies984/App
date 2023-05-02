import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { Button,TextInput } from 'react-native-paper'
import FormHeader from '../../components/FormHeader/FormHeader'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import { useDispatch } from 'react-redux'
import { API_register } from '../../api'
import { getUser } from '../../reducers/features/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {v4 as uuidv4} from 'uuid'
import colors from '../../../colors'


const Otp = ({navigation,route}) => {
    const dispatch = useDispatch()
    const {params}=route
    const {data}=params
    const [otp,setOtp]=useState()
    const handleSubmit =async()=>{
        if(data.otp !=otp){
          const id=uuidv4();
          dispatch(setAlert(Object({id,msg:"OTP incorrect"})))
          setTimeout(()=>{
            dispatch(deleteAlert(id))
          },1000)
          return;
        }
        dispatch(setLoading(true))
        const obj ={
          ...data
        }
        try {
          const {data}=await API_register(obj)
          const user = data.user;
          await AsyncStorage.setItem("Agencies",JSON.stringify(data));
          dispatch(getUser(Object(user)))
          const id = uuidv4();
          dispatch(setAlert(Object({id,msg:`Welcome ${user?.name}`})))
          setTimeout(()=>{
            dispatch(deleteAlert(id))
          },2000)
          navigation.replace("MyTab",{screen:"Home"})
        } catch (error) {
          console.log(error)
          const id = uuidv4();
          dispatch(setAlert(Object({id,msg:"Try after Some Time"})))
          setTimeout(()=>{
            dispatch(deleteAlert(id))
          },2000)
        }
        dispatch(setLoading(false))
    }
  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <FormHeader />
            <View style={styles.context}>
            <Text style={styles.contextText}>OTP Is sent to your Email</Text>
            <Text style={styles.contextText}>{data.email}</Text>
        </View>
          <TextInput
                mode="flat"
                label="OTP"
                placeholder="Enter the OTP"
                keyboardType='numeric'
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
            />
        <View style={styles.buttonContainer}>
            <Button mode="text" onPress={()=>navigation.goBack()}>
                Go Back
            </Button>
            <Button mode="outlined" style={styles.otpButton} onPress={()=>handleSubmit()}>
                Verify and Register
            </Button>
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
        width:"90%",
        borderWidth:2,
        borderRadius:24,
        borderColor:colors.peacock,
        borderStyle:"solid",
        padding:24
    },
      heading:{
    textAlign:"center",
    marginVertical:12,
  },
  context:{
        alignItems:"center",
        marginVertical:12,
  },
  contextText:{
    color:"green",
    fontSize:18
  },
  input:{
    borderColor:"#ffed07",
    backgroundColor:"#FFF",
    color:"black",
    borderBottomColor:"#212529",
    borderBottomWidth:1,
    marginVertical:2,
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginVertical:12,
  },
  otpButton:{
    backgroundColor:colors.yellow
  }
})

export default Otp



