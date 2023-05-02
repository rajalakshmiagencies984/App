import { View, Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import colors from '../../../colors'
import FormHeader from '../../components/FormHeader/FormHeader'
import OneSignal from 'react-native-onesignal'
import {Text as TextRP,TextInput,Button } from 'react-native-paper'
import { API_Send_Otp } from '../../api'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import { useDispatch } from 'react-redux'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import {v4 as uuidv4} from 'uuid'
const Register = ({navigation}) => {

  const [email,setEmail]=useState("karthirajendran12003@gmail.com");
  const [password,setPassword]=useState("karthi12003")
  const [phone,setPhone]=useState("8667259481")
  const [name,setName]=useState("karthikeyan")
  const [aadhar,setAadhar]=useState("123456789012")
  const [deviceId,setDeviceID]=useState("")
 
  const dispatch = useDispatch();

  const handleLogin = ()=>{
        navigation.navigate("Login")
  }
  useLayoutEffect(()=>{
        const getDeviceId =async()=>{
           let device= await OneSignal.getDeviceState()   
            setDeviceID(device.userId)
      }
      getDeviceId()
    },[])

      const  generateOTP = ()=> {
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 4; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP; 
    }

    const handleSubmit =async()=>{
    
      dispatch(setLoading(Boolean(true)))
      try {
        const id = uuidv4();
        const otp = generateOTP();
        console.log(otp)
        const {data}=await API_Send_Otp({email,otp})
        dispatch(setAlert(Object({id:id,msg:`Sent OTP to ${email}`})))
        setTimeout(()=>{
          dispatch(deleteAlert(id))
          navigation.push("Otp",{data:{deviceId,otp,name,email,phone,aadhar,password}})
        },2000)
      } catch (error) {
        console.log(error)
          const id = uuidv4();
          dispatch(setAlert(Object({id,msg:"Cannot Send Otp"})))
          setTimeout(()=>{
            dispatch(deleteAlert(id))
          },2000)
      }
      dispatch(setLoading(Boolean(false)))
    }
   
    

  return (
    
    <ScrollView  style={styles.container}>
      <View style={{marginTop:"20%"}}>
        <View style={styles.form}>
          <FormHeader/>
          <Text style={styles.loginHead}>Register</Text>
          <TextInput 
                  mode="flat"
                  label="Name"
                  placeholder="Enter your Name" 
                  value={name}
                  onChangeText={setName}
                  style={styles.input} />
          <TextInput 
                  mode="flat"
                  label="Email"
                  placeholder="Enter your Email" 
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input} />
          <TextInput 
                  mode="flat"
                  label="Phone"
                  placeholder="Enter your Phone number" 
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType='numeric'
                  style={styles.input} />
          <TextInput 
                  mode="flat"
                  label="Aadhar No."
                  placeholder="Enter your Aadhar number" 
                  value={aadhar}
                  onChangeText={setAadhar}
                  keyboardType='numeric'
                  style={styles.input} />
          
          <TextInput 
                  mode="flat"
                  label="Password"
                  secureTextEntry
                  placeholder="Enter your Password" 
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input} />

          <Button textColor={colors.black} style={styles.button}  onPress={handleSubmit} mode="outlined" >
                    Register
            </Button>
            <View style={styles.bottom}>
                       <TextRP variant="bodyLarge">Already have an acccount</TextRP>
                        <TouchableOpacity onPress={handleLogin}>   
                        <TextRP variant='bodyLarge' style={styles.login}>Login</TextRP>
                      </TouchableOpacity> 
                </View> 
        </View>
  </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // position:"relative",
    // width:"100%",
    backgroundColor:colors.white,
    // justifyContent:"center",
    // alignItems:"center"
    padding:24,
   
  },
  form:{
  
    borderColor:colors.peacock,
    borderRadius:24,
    borderStyle:"solid",
    borderWidth:2,
    backgroundColor:colors.white,
    padding:24,
    width:"100%",
  },
  loginHead:{
    textAlign:"center",
    margin:12,
    fontSize:18,
    fontWeight:600,
    color:colors.green
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

export default Register