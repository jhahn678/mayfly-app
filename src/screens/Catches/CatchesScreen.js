import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import BaseFAB from '../../components/buttons/BaseFAB'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import CatchesListItem from '../../components/catches/CatchesListItem'
import FontelloIcon from '../../components/icons/Fontello'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useGetUserCatchesQuery } from '../../hooks/queries/getUserCatches'
import { useAuthContext } from '../../store/context/auth'
import { useScrollToTopButton } from '../../hooks/utils/useScrollToTopButton'

const CatchesScreen = () => {

  const { user } = useAuthContext()
  const { data, error, loading, refetch } = useGetUserCatchesQuery(user._id)

  const route = useRoute()
  const navigation = useNavigation()
  const { flatListRef, showScrollButton, handleScrollToTop, onScroll } = useScrollToTopButton()
  const [selectedItems, setSelectedItems] = useState([])
  

  return (
    <PrimaryBackground style={{ display: 'flex', justifyContent: 'space-between', postition: 'relative'}}>

        <CatchesTabHeader selectedItems={selectedItems}/>
        
        <View style={styles.main}>
          { data &&
            <FlatList data={data.getUser.catches} ref={flatListRef}
              onScroll={e => onScroll(e)} keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <CatchesListItem item={item} 
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 16, width: '100%' }}/>}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              refreshing={loading} onRefresh={() => refetch()}
            />
          }
          { loading && <ActivityIndicator color='#0eaaa7' size={64} style={{ paddingTop: '50%' }}/> }
        </View>

        <ScrollToTopButton showScrollToTop={showScrollButton} onPress={handleScrollToTop}/>

        <BaseFAB icon={<FontelloIcon name='fish-add' size={28} color='#fefefe'/>} 
          style={{ position: 'absolute', right: 24, bottom: 112 }}
          onPress={() => navigation.navigate('NewCatch')}
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
  },
  main: {
    width: '100%',
    height: '84%',
    overflow: 'hidden',
  }
})