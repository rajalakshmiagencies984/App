import { View, Text,StyleSheet,ScrollView } from 'react-native'
import {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { useSelector } from 'react-redux'
import Carousel from '../../components/Carousel/Carousel'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import DummySearch from '../../components/DummySearch/DummySearch'
import Search from '../Search/Search'
const Home = ({navigation}) => {
  const category = useSelector((state)=>(state.category));
  const products = useSelector((state)=>(state.product))
  const [titles,setTitles]=useState([]);
  const [display,setDisplay]=useState(false)

  useEffect(()=>{
      if(category.length>0){
        const data = category.map(c=>  c.title)
        setTitles([...data])
      }
  },[category])
  
  const setState = ()=>{
      setDisplay(!display)
  }

  return (
  
      <ScrollView style={{flex:1}}>
    <View style={styles.container}>
      <Header />
      <DummySearch  />
      <Carousel category={category} />
    </View>
    <View style={styles.productList}>
      {titles.map((t,i)=>(
        <HomeProducts category={category.filter(c=>c.title==t)[0]} key={i} products={products.filter(p=> p.category==t).slice(0,4)} />
        ))}
    </View>
        </ScrollView>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
  },
  productList:{
    alignItems:"center",
    flexDirection:'column-reverse',

  }
})

export default Home