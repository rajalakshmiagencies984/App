import { View, Text,StyleSheet, ScrollView, Alert } from 'react-native'
import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Button,Text as TextRN,RadioButton,Switch } from 'react-native-paper'
import { API_newOrder } from '../../api'
import colors from '../../../colors'
import {v4 as uuidv4} from 'uuid'
import { setLoading } from '../../reducers/features/loading/loadingSlice'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
import {useStripe} from '@stripe/stripe-react-native'
import { API_paymentIntent } from '../../api'
import { addOrder } from '../../reducers/features/orders/orderSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteCart } from '../../reducers/features/cart/cartSlice'

const PlaceOrder = ({navigation}) => {

  const carts = useSelector((state)=>(state.cart))
  const products=useSelector((state)=>(state.product))
  const user=useSelector((state)=>(state.user))
  const [checked, setChecked] = useState();
  const dispatch = useDispatch()
  const [total,setTotal]=useState(0)
  React.useEffect(()=>{
    const values = carts.map(c=> c.totalAmount);
    const value = values.reduce((a,b)=> a+b);
    setTotal(value)
  },[])
  const [cash, setCash] = React.useState(false);

  const onToggleCash = () => setCash(!cash);

  const [online,setOnline]=React.useState(false)

  const onToggleOnline = ()=>setOnline(!online)
  React.useEffect(()=>{
      if(cash==true && online==true){
        setOnline(false)
      }
  },[cash])


   React.useEffect(()=>{
      if(cash==true && online==true){
        setCash(false)
      }
  },[online])

  React.useEffect(()=>{
      if(user && user.address.length!=0){
          setChecked(user.address[0]._id)
      }
  },[user])


  const {initPaymentSheet,presentPaymentSheet}=useStripe()

  const handleSubmitOrder=async()=>{
    dispatch(setLoading(true))
    if(cash==false && online==false){
      const id = uuidv4()
      dispatch(setAlert(Object({id,msg:"Please Select mode of Payment"})))
      setTimeout(()=>{
          dispatch(deleteAlert(id))
      },2000)
      dispatch(setLoading(false))
      return
    }
    const obj ={
      products:carts,
      user:user._id,
      address:checked,
      totalAmount:total,
      status:"ordered",
      modeOfPayment:cash?"cash":"online",
      paid:cash?false:true
    }

    try {
         const {data}=await API_newOrder(obj)
         await AsyncStorage.removeItem("Cart")
         dispatch(addOrder(Object(data)))
         dispatch(deleteCart());
         let id=uuidv4()
         dispatch(setAlert(Object({id,msg:"Order Places Successfully"})))
         setTimeout(()=>{
            dispatch(deleteAlert(id))
         },3000)
         navigation.replace("MyTab",{screen:"History"})
    } catch (error) {
      console.log(error)
      let id=uuidv4()
      dispatch(setAlert(Object({id,msg:"Error Try after Some Time"})))
      setTimeout(()=>{
         dispatch(deleteAlert(id))
      },3000)
      navigation.replace("myTab",{screen:"Home"})
    }
    dispatch(setLoading(false))

  }

  const onCheckout = async()=>{
    try {
      const {data} = await API_paymentIntent({amount:Math.floor(total *100)})
      var dataIntent=data.paymentIntent
    } catch (error) {
      Alert.alert("Something went wrong")
      return
    }

      const initResponse = await initPaymentSheet({
        merchantDisplayName:user.name,
        paymentIntentClientSecret:dataIntent
      })

      if(initResponse.error){
        Alert.alert("Something went Wrong")
        return
      }

      const paymentResponse =  await presentPaymentSheet();
      if(paymentResponse.error){
        Alert.alert("Something Went Wrong")
        return ;
      }

      handleSubmitOrder();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}}>

      <TextRN variant='titleLarge'style={{margin:12}}>Products</TextRN>
      <View style={styles.productsContainer}>
        {
          carts.map(c=>{
            const product =products.filter(p=>p._id==c.product_id)[0]
            return(
              <View style={styles.productItem} key={c.id}>
                <View>
                    <Text style={{fontSize:14}}>{product.name}({c.quantity}) - {product.category}</Text>
                </View>

                <View>
                    <Text style={{fontSize:14}}>{c.quantityOfProducts} X {c.price} = ₹{c.totalAmount}</Text>
                </View>

              </View>
            )
          })
        }
      </View>
      <View style={{backgroundColor:"white",flexDirection:"row",justifyContent:"flex-end"}}>
        <View style={{marginHorizontal:12,marginBottom:10}}>
          <Text>Total - ₹{total}</Text>
        </View>
      </View>

      <Text style={{color:"red",fontSize:14,margin:12}}>**Delivery Charges will be collected during Delivery of products**</Text>

      {/*  */}
      <View style={styles.paymentContainer}>
        <TextRN variant='titleLarge' style={{margin:12}}>Choose Mode Of Payment</TextRN>
            <View style={styles.toggleContainer}>
              <View>
                <Text>Cash On Delivery</Text>
              </View>
              <View>
                  <Switch value={cash} onValueChange={onToggleCash} />
              </View>
            </View>


        {total >100 &&

      <View style={styles.toggleContainer}>
          <View>
            <Text>Online Payment</Text>
          </View>
          <View>
              <Switch value={online} onValueChange={onToggleOnline} />
          </View>
        </View>
    }
      </View>


      {/*  */}
      <View style={styles.addressContainer}>
          <TextRN variant='titleLarge' style={{margin:12}}>Select Your Address</TextRN>
          <View style={styles.addressList}>
            {user.address.map(a=>(
              <View style={styles.addressItem} key={a._id}>
                  <Text>{a.doorNo}</Text>
                  <Text>{a.street}</Text>
                  <Text>{a.city}</Text>
                  <Text>{a.pinCode}</Text>
                  <RadioButton
                    color={colors.peacock}
                    value={a._id}
                    status={ checked === a._id ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(a._id)}
                  />
              </View>
            ))}
          </View>
      </View>

      {/*  */}

      <View>
        <Button onPress={online?onCheckout:handleSubmitOrder} mode="contained">Confirm Order</Button>
      </View>


      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
  },
  productsContainer:{
    backgroundColor:colors.white,
    padding:12,
    gap:12,
  },
  productItem:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  toggleContainer:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:12,
    padding:12,
    paddingHorizontal:24
  },
  paymentContainer:{
    backgroundColor:colors.white,
    borderRadius:12,
    elevation:10,
    margin:12
  },
  addressContainer:{
    margin:12,
    elevation:20,
    padding:12,
    backgroundColor:colors.white,
    borderRadius:12
  },
  addressList:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      gap:2,
      flexWrap:"wrap"
  },
  addressItem:{
    width:"48%",
    borderColor:colors.peacock,
    borderWidth:4,
    borderRadius:12,
    elevation:10,
    padding:6,
    backgroundColor:colors.white
  }
})

export default PlaceOrder
