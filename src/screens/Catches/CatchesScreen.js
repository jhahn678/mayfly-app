import { StyleSheet, View, FlatList } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { FAB } from '@rneui/themed'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import CatchesListItem from '../../components/catches/CatchesListItem'
import { globalStyles } from '../../styles/globalStyles'
import FontelloIcon from '../../components/icons/Fontello'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'
import { useNavigation, useRoute } from '@react-navigation/core'
import { formatCreatedAt } from '../../utils/format-dates'
import { useGetUserCatchesQuery } from '../../hooks/queries/getUserCatches'
import { useAuthContext } from '../../store/context/auth'

const CatchesScreen = () => {

  const { user } = useAuthContext()
  const { data } = useGetUserCatchesQuery(user._id)


  const flatListRef = useRef()
  const route = useRoute()
  const navigation = useNavigation()

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

        <CatchesTabHeader selectedItems={selectedItems}/>
        
        <View style={styles.main}>
          <FlatList data={data?.getUser?.catches} ref={flatListRef}
            onScroll={e => onScroll(e)}
            renderItem={({ item }) => (
              <CatchesListItem item={item} 
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

        <FAB icon={<FontelloIcon name='fish' size={36} color='#fefefe'/>} 
          style={{ ...globalStyles.FAB, ...globalStyles.FABshadow, bottom: 112 }}
          onPress={() => navigation.navigate('NewCatch')}
          buttonStyle={{ paddingTop: 10, paddingLeft: 8 }}
        />

    </PrimaryBackground>
  )
}

export default CatchesScreen

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