import { View, Animated,FlatList } from 'react-native'
import React,{useRef,useState} from 'react'
import Slider from '../Slider/Slider'
import Pagination from '../Pagination/Pagination'
const Carousel = ({category}) => {
    const [index,setIndex]=useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const handleOnScroll =event =>{
        Animated.event([
            {
                nativeEvent :{
                    contentOffset:{
                        x:scrollX,
                    }
                }
            }
        ],{useNativeDriver:false}
        )(event);
    }

    const hanldeOnViewable = useRef(({viewableItems})=>{
       setIndex(viewableItems[0].index)
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold:50
    }).current

  return (
    <View>
      
           <FlatList 
            data={category} 
            renderItem={({item}) => <Slider item={item}/>}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={hanldeOnViewable}
            viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={category} scrollX={scrollX} index={index} />
    </View>
  )
}



export default Carousel