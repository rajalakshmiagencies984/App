import { SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import OneSignal from 'react-native-onesignal'
import AppNavigation from './src/screens/AppNavigation/AppNavigation'
import Loading from './src/components/Loading/Loading'
import Alert from './src/components/Alert/Alert'
import 'react-native-get-random-values'
import { useLayoutEffect } from 'react'
import { API_getCategory,API_getproduct } from './src/api'
import { useDispatch } from 'react-redux'
import { getProduct } from './src/reducers/features/product/productSlice'
import { setLoading } from './src/reducers/features/loading/loadingSlice'
import { getCategory } from './src/reducers/features/category/categorySlice'

const App = () => {
  OneSignal.setAppId("a6038cb7-0462-44e1-ae04-805a481d3196");
  
  const dispatch = useDispatch();
  useLayoutEffect(()=>{
    dispatch(setLoading(true))
    const getproductData = async()=>{
      try {
        const {data} = await API_getproduct();
        dispatch(getProduct(Object(data)))
      } catch (error) {
        console.log(error,"error in product")
      }
    }
    getproductData();
    const getCategoryData =async()=>{
      try {
        const {data}=await API_getCategory();
        dispatch(getCategory(Object(data)))
      } catch (error) {
          console.log(error,"Error in category")
      }
    }
    getCategoryData();
    dispatch(setLoading(false))
  },[])
  return (
    <SafeAreaView style={styles.container}>
        <Loading />
        <Alert />
        <AppNavigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFF"
  }
})

export default App