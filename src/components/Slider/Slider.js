import { View, Text,Image,StyleSheet,Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
const {width}=Dimensions.get("screen")
import { useNavigation } from '@react-navigation/native'

const Slider = ({item}) => {
  const navigation =  useNavigation();

  return (
    <View style={[styles.container,{backgroundColor:item.background}]}>
      <View>
           <Image source={{uri:item.image}} style={styles.image} resizeMode='contain' />
      </View>
      <View style={styles.details}>
        <Text style={[styles.title,{color:item.color}]}>{item.title}</Text>
        <Text style={[styles.count,{color:item.color}]}>{item.products.length} products</Text>
        <Button onPress={()=> navigation.push('MyTab',{screen:"Products",params:{category:item.title}})} textColor={item.background} buttonColor={item.color} mode='contained'>View Products</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:200,
        width,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    image:{
            height:175,
            width:175
    },
    details:{
      justifyContent:"center",
      alignItems:"center",
      gap:12
    },
    title:{
      fontSize:28,
      fontWeight:"bold"
    },
    count:{
      fontSize:20,
      fontWeight:500
    }

    
})

export default Slider