import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import colors from '../../../colors'
import moment from 'moment'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import { deleteUser } from '../../reducers/features/user/userSlice'
import {v4 as uuidv4} from 'uuid'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
const UserDetails = ({user}) => {
 const date = moment(user.joinedOn).fromNow();
 const dispatch=useDispatch();
 const navigation = useNavigation();
 const handleLogout = async ()=>{
    dispatch(setLoading(true))
    await AsyncStorage.removeItem("Agencies")
    const id = uuidv4();
    dispatch(setAlert(Object({id,msg:"Logout Successfull"})))
    dispatch(deleteUser())
    setTimeout(()=>{
        dispatch(deleteAlert(id))
    },3000)
    navigation.replace("Loading")
    dispatch(setLoading(false))

 }
  return (
    <View style={styles.container}>
        <View style={styles.div}>
            <Text style={styles.label}>
                Name:
            </Text>
            <Text style={styles.value}>
                {user.name}
            </Text>
        </View>

         <View style={styles.div}>
            <Text style={styles.label}>
                Email:
            </Text>
            <Text style={styles.value}>
                {user.email}
            </Text>
        </View>

        <View style={styles.div}>
            <Text style={styles.label}>
                Phone:
            </Text>
            <Text style={styles.value}>
                {user.phone}
            </Text>
        </View>

        <View style={styles.div}>
            <Text style={styles.label}>
                AadharNo:
            </Text>
            <Text style={styles.value}>
                {user.aadhar}
            </Text>
        </View>

        <View style={styles.div}>
            <Text style={styles.label}>
                Device Id:
            </Text>
            <Text style={styles.value}>
                {user.deviceId || "-"}
            </Text>
        </View>

        <View style={styles.div}>
            <Text style={styles.label}>
                Joined on:
            </Text>
            <Text style={styles.value}>
                {date}
            </Text>
        </View>

        <View style={[styles.div,{marginVertical:12}]}>
            <Button mode="contained" onPress={handleLogout} >
                Logout
            </Button>
        </View>





    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:"90%",
        elevation:6,
        marginHorizontal:12,
        backgroundColor:colors.white,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        flexWrap:"wrap",
        gap:12,
        padding:12
    },
    div:{
        width:"46%"
    },
    label:{
        fontSize:18,
        fontWeight:500,
        color:colors.black,
    },
    value:{
        fontSize:15,
        color:colors.black
    }
})

export default UserDetails
