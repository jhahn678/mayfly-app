import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'
import GroupListItem from '../../components/groups/GroupListItem'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import { useGetUserGroups } from '../../hooks/queries/getUserGroups'
import { useScrollToTopButton } from '../../hooks/utils/useScrollToTopButton'
import { useAuthContext } from '../../store/context/auth'
import { messageSubscription } from '../../hooks/subscriptions/getMessageSubscription'


const GroupsScreen = () => {

  const { user } = useAuthContext()
  const { data, loading, error, subscribeToMore } = useGetUserGroups(user._id)
  const { showScrollButton, onScroll, handleScrollToTop, flatListRef } = useScrollToTopButton()
  const [selectedItems, setSelectedItems] = useState([])


  return (
    <PrimaryBackground style={{ display: 'flex', justifyContent: 'space-between'}}>

        <GroupsTabHeader selectedItems={selectedItems}/>

        <View style={styles.main}>
          { data &&
            <FlatList
              data={data?.getUser.groups}
              ref={flatListRef}
              onScroll={e => onScroll(e)}
              renderItem={({ item }) => (
                <GroupListItem 
                  item={item} 
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  subscribeToUpdates={() => subscribeToMore(messageSubscription(item._id))}
                />
              )}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          }
          { loading && <ActivityIndicator color='#0eaaa7' size={64} style={{ paddingTop: '50%' }}/> }
        </View>
        
        <ScrollToTopButton showScrollToTop={showScrollButton} onPress={handleScrollToTop}/>

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