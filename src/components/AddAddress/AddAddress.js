import { View,StyleSheet } from 'react-native'
import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import colors from '../../../colors'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import { Text,TextInput,Button } from 'react-native-paper'
import { API_add_address } from '../../api'
import { getUser } from '../../reducers/features/user/userSlice'
import {v4 as uuidv4} from 'uuid'

const AddAddress = ({navigation}) => {
 const dispatch = useDispatch();
 const user = useSelector((state)=>(state.user))
 const [doorNo,setDoor]=useState("")
 const [street,setStreet]=useState('')
 const [city,setCity]=useState("")
 const [pinCode,setPinCode]=useState("")

 const handleSubmit =async()=>{
    const obj = {id:user._id,doorNo,street,city,pinCode};
    dispatch(setLoading(true))
    try {
        const id = uuidv4();
        const {data}=await API_add_address(obj);
        console.log(data)
        dispatch(getUser(Object({...data})))
        dispatch(setAlert(Object({id,msg:"Address added Successfully"})))
        setTimeout(()=>{
            dispatch(deleteAlert(id))
        },5000)
        navigation.replace("MyTab",{screen:"Account"})
    } catch (error) {
        const id = uuidv4();
        dispatch(setAlert(Object({id,msg:"Try after some Time"})));
        setTimeout(()=>{
            dispatch(deleteAlert(id))
        },5000)
        navigation.replace("MyTab",{screen:"Home"})
    }
    dispatch(setLoading(false))

 }
  return (
    <View style={styles.container}>
        <View>
            <Text variant="titleLarge">Add Address</Text>
            <TextInput
                  mode="flat"
                  label="Door No"
                  placeholder="Enter your Door Number"
                  value={doorNo}
                  onChangeText={setDoor}
                  style={styles.input}
            />
             <TextInput
                  mode="flat"
                  label="Street Name"
                  placeholder="Enter your Street Name"
                  value={street}
                  onChangeText={setStreet}
                  style={styles.input}
            />
             <TextInput
                  mode="flat"
                  label="City "
                  placeholder="Enter your City "
                  value={city}
                  onChangeText={setCity}
                  style={styles.input}
            />
             <TextInput
                  mode="flat"
                  label="Pin Code"
                  keyboardType='numeric'
                  placeholder="Enter your Pin Code"
                  value={pinCode}
                 onChangeText={setPinCode}
                  style={styles.input}
            />

            <Button onPress={handleSubmit} style={styles.btn} mode="contained"> Add your Address</Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        padding:24
    },
    input:{
        backgroundColor:"#FFF",
        color:"black",
        borderBottomColor:colors.black,
        borderBottomWidth:2,
        marginVertical:2,
  },
  btn:{
    margin:24,
    backgroundColor:colors.peacock
  }
})

export default AddAddress
