import { TouchableOpacity, ScrollView,View,Text,StyleSheet,Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import colors from '../../../colors'
import back from '../../assests/back.png'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { TextInput } from 'react-native-paper'
const Search = ({navigation}) => {
  const products = useSelector((state)=>(state.product))
  const [search,setSearch]=useState("")
  const [datas,setDatas]=useState([])

  useEffect(()=>{
    if(search.length >0){
      const word = search.toLowerCase();
      const data = products.filter(p => p.name.toLowerCase().includes(word))

      setDatas([...data])
    }
  },[search])
  
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.searchBarcontainer}>
        <TextInput 
          mode="flat"
          label="Search"
          placeholder="Enter Product Name"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
            <Image source={back} style={{height:32,width:32}} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex:1}}>
        <View>
          {datas.map(d=>(
            <TouchableOpacity  onPress={()=>navigation.push("MyTab",{screen:"SingleProduct",params:{id:d._id}})} style={styles.dataItem} key={d._id}>
                <Text style={styles.dataText}>{d.name} - {d.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    searchBarcontainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    backContainer:{
      width:"10%",

    },
    input:{
      borderColor:"#ffed07",
      backgroundColor:"#FFF",
      color:"black",
      borderBottomColor:"#212529",
      borderBottomWidth:1,
      marginVertical:2,
      width:"80%"
  },
  dataItem:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderBottomColor:colors.peacock,
    borderBottomWidth:1,
    borderStyle:"solid",
    marginVertical:12,
    paddingBottom:4
  },
  dataText:{
    color:colors.black,
    fontSize:16
  }
})

export default Search