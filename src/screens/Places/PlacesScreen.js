import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BaseFAB from '../../components/buttons/BaseFAB'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import PlacesListItem from '../../components/places/PlacesListItem'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { useGetUserPlacesQuery } from '../../hooks/queries/getUserPlaces'
import { useAuthContext } from '../../store/context/auth'
import { useScrollToTopButton } from '../../hooks/utils/useScrollToTopButton'

const PlacesScreen = () => {

  const { user } = useAuthContext()
  const { data, loading, error } = useGetUserPlacesQuery(user._id)

  const { handleScrollToTop, flatListRef, onScroll, showScrollButton} = useScrollToTopButton()
  const navigateToMap = useNavigateToMap()
  const [selectedItems, setSelectedItems] = useState([])


  return (

    <PrimaryBackground style={{ display: 'flex', justifyContent: 'space-between'}}>

        <PlacesTabHeader selectedItems={selectedItems}/>
        
        <View style={styles.main}>
          { data &&
            <FlatList data={data.getUser.places} ref={flatListRef}
              onScroll={e => onScroll(e)}
              renderItem={({ item }) => (
                <PlacesListItem item={item} 
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={() => <View style={{ height: 16, width: '100%' }}/>}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          }
          { loading && <ActivityIndicator color='#0eaaa7' size={64} style={{ paddingTop: '50%' }}/> }
        </View>

        <ScrollToTopButton showScrollToTop={showScrollButton} onPress={handleScrollToTop}/>
        
        <BaseFAB icon={<Icon name='add-location-alt' size={32} color='#fefefe'/>} 
          style={{ position: 'absolute', right: 24, bottom: 112 }}
          onPress={() => navigateToMap({ snapshot: true, save: true, replace: true })}
        />

    </PrimaryBackground>
  )
}

export default PlacesScreen

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingBottom: 100,
    paddingTop: 16
  },
  main: {
    width: '100%',
    height: '84%',
    overflow: 'hidden'
  }
})