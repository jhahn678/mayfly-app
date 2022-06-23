import { StyleSheet, View, FlatList } from 'react-native'
import { useState, useRef } from 'react'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/core'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import { makeFakePlaces } from '../../../test-data/groups'
import PlacesListItem from '../../components/places/PlacesListItem'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'

const PlacesScreen = () => {

  const [places] = useState(makeFakePlaces(10))

  const navigation = useNavigation()
  const navigateToMap = useNavigateToMap()
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

        <PlacesTabHeader selectedItems={selectedItems}/>
        
        <View style={styles.main}>
          <FlatList data={places} ref={flatListRef}
            onScroll={e => onScroll(e)}
            renderItem={({ item }) => (
              <PlacesListItem item={item} 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                showPlace={() => navigation.navigate('Place', { placeId: item._id })}
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <ScrollToTopButton showScrollToTop={showScrollToTop} onPress={handleScrollToTop}/>

        <FAB icon={<Icon name='add-location-alt' size={32} color='#fefefe'/>} 
          style={{ ...globalStyles.FAB, ...globalStyles.FABshadow, bottom: 112 }}
          onPress={() => navigateToMap({ snapshot: true, save: true, replace: true })}
          buttonStyle={{ padding: 0 }}
        />

    </PrimaryBackground>
  )
}

export default PlacesScreen

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingBottom: 100,
    paddingTop: 16,
    backgroundColor: '#fefefe'
  },
  main: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#fefefe',
    elevation: 20
  }
})