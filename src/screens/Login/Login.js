import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import colors from '../../../colors'
import FormHeader from '../../components/FormHeader/FormHeader'
import {Text as TextRP,TextInput,Button } from 'react-native-paper'
const Login = ({navigation}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")

  const handleLogin = ()=>{
        navigation.navigate("Register")
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
                  onChangeText={setPassword}
                  style={styles.input} />

          <Button style={styles.button}  mode="outlined" >
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
    borderWidth:4,
    backgroundColor:colors.white,
    padding:24,
    width:"80%",
    elevation:20,
    shadowColor: '#000',
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

export default Login