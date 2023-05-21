import { View, Text,StyleSheet,ScrollView,RefreshControl } from 'react-native'
import {useState,useEffect,useCallback} from 'react'
import Header from '../../components/Header/Header'
import colors from '../../../colors'
import { useSelector,useDispatch } from 'react-redux'
import Carousel from '../../components/Carousel/Carousel'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import DummySearch from '../../components/DummySearch/DummySearch'
import { API_getCategory,API_getproduct } from '../../api'
import {getCategory} from '../../reducers/features/category/categorySlice'
import { getProduct } from '../../reducers/features/product/productSlice'
import {v4 as uuidv4} from 'uuid'
import { setAlert,deleteAlert } from '../../reducers/features/alert/alertSlice'
const Home = ({navigation}) => {
  const category = useSelector((state)=>(state.category));
  const products = useSelector((state)=>(state.product))
  const [titles,setTitles]=useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
      if(category.length>0){
        const data = category.map(c=>  c.title)
        setTitles([...data])
      }
  },[category])


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const getData= async()=>{
    try {
      const categoryData = await API_getCategory()
      dispatch(getCategory(categoryData.data))

      const productData =await API_getproduct()
      dispatch(getProduct(productData.data))

      const id=uuidv4();
      dispatch(setAlert(Object({id,msg:"Reloaded"})))
      setTimeout(()=>{
          dispatch(deleteAlert(id))
          setRefreshing(false)
      },2000)
    } catch (error) {
      const id=uuidv4();
      dispatch(setAlert(Object({id,msg:"Server Busy "})))
      setTimeout(()=>{
          dispatch(deleteAlert(id))
          setRefreshing(false)
      },2000)
    }
  }
    getData()


  }, []);

  return (

      <ScrollView style={{flex:1}}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }      >
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
