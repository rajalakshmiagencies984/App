import { View, Text,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import colors from '../../../colors'
import FormHeader from '../../components/FormHeader/FormHeader'
import {Text as TextRP,TextInput,Button } from 'react-native-paper'
const Register = ({navigation}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const [name,setName]=useState("")
  const [aadhar,setAadhar]=useState("")

  const handleLogin = ()=>{
        navigation.navigate("Login")
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
                  placeholder="Enter your Password" 
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input} />

          <Button style={styles.button}  mode="outlined" >
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
    borderWidth:4,
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
    backgroundColor:colors.peacock,
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