import { View, ScrollView,StyleSheet,Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import SingleProductCard from '../../components/SingleProductCard/SingleProductCard'
import colors from '../../../colors'

const SingleProduct = ({navigation,route}) => {
  const {params}=route
  const {id} = params

  

  const products = useSelector((state)=>(state.product))


  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{flex:1}}>
          {products.filter(p=> p._id == id).map(p=>(
              <SingleProductCard  product={p} key={p._id} />
          ))}
      </ScrollView> 
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  }
})

export default SingleProduct