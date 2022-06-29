import { useState, useRef } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'
import GroupListItem from '../../components/groups/GroupListItem'
import { fakeGroups } from '../../../test-data/groups'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'


const GroupsScreen = () => {

  const flatListRef = useRef()
  const [showScrollToTop, setShowScrollToTop] = useState(false) 
  const [selectedItems, setSelectedItems] = useState([])
  
  const handleScrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0 })
  }

  const onScroll = ({ nativeEvent: { contentOffset: { y } }}) => {
    if(y > 600) return setShowScrollToTop(true)
    if(y <= 600) return setShowScrollToTop(false)
  }

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
            showsVerticalScrollIndicator={false}
          />
        </View>
        
        <ScrollToTopButton showScrollToTop={showScrollToTop} onPress={handleScrollToTop}/>

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
  main: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#fefefe',
    elevation: 2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: .3,
    shadowOffset: { height: -4 },
  }
})