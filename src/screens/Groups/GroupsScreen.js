import { useState, useEffect, useRef } from 'react'
import { StyleSheet, FlatList, View, Animated } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'
import GroupListItem from '../../components/groups/GroupListItem'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { fakeGroups } from '../../../test-data/groups'
import { FAB } from '@rneui/themed'


const GroupsScreen = () => {

  const flatListRef = useRef()
  const opacityRef = useRef(new Animated.Value(0)).current
  const [showScrollToTop, setShowScrollToTop] = useState(false) 
  const [selectedItems, setSelectedItems] = useState([])
  
  const handleScrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0 })
  }

  const onScroll = ({ nativeEvent: { contentOffset: { y } }}) => {
    if(y > 600) return setShowScrollToTop(true)
    if(y <= 600) return setShowScrollToTop(false)
  }

  useEffect(() => {
    if(showScrollToTop){
      Animated.timing(opacityRef, {
        toValue: 1,
        duration:150,
        useNativeDriver: true
      }).start();
    }else{
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();
    }
  },[showScrollToTop])

  return (
    <PrimaryBackground style={{ display: 'flex', justifyContent: 'space-between'}}>
        <GroupsTabHeader selectedItems={selectedItems}/>
        <View style={styles.main}>
          <FlatList
            data={fakeGroups}
            ref={flatListRef}
            onScroll={e => onScroll(e)}
            renderItem={({ item }) => (
              <GroupListItem 
                item={item} 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.list}
          />
        </View>
        <Animated.View style={{ opacity: opacityRef }}>
          <FAB size='small' buttonStyle={{ height: 36, width: 36 }}
            icon={<IonIcon name='arrow-up' size={16} color='#fefefe'/>} 
            style={{...styles.scrollUp }} onPress={handleScrollToTop}
          />
        </Animated.View>
    </PrimaryBackground>
  )
}

export default GroupsScreen

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingBottom: 100,
    paddingTop: 16,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fefefe'
  },
  scrollUp: {
    position: 'absolute',
    bottom: 92,
    alignSelf: 'center',
    color: '#3ea9e2',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: .3,
    shadowOffset: { height: 2 },
    elevation: 400
  },
  main: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#fefefe',
  }
})