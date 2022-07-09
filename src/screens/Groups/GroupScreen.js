import { StyleSheet, View, FlatList, Text, ActivityIndicator} from 'react-native'
import { useEffect } from 'react'
import GroupHeader from '../../components/headers/GroupHeader'
import { formatTimeMessage } from '../../utils/format-dates'
import MessageBar from '../../components/groups/MessageBar'
import TextMessage from '../../components/groups/message/TextMessage'
import { Avatar } from '@rneui/themed'
import { useRoute } from '@react-navigation/core'
import { useImageContext } from '../../store/context/image'
import { useGetGroupQuery, GET_GROUP_MESSAGES } from '../../hooks/queries/getGroup'
import { groupSubscription } from '../../hooks/subscriptions/getGroupSubscription'
import Gradient from '../../components/backgrounds/Gradient'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import { useScrollToTopButton } from '../../hooks/utils/useScrollToTopButton'
import MediaMessage from '../../components/groups/message/MediaMessage'



const GroupScreen = () => {

  const { flatListRef, handleScrollToTop, onScroll, showScrollButton} = useScrollToTopButton()
  const { setChatImages } = useImageContext()
  const { params } = useRoute()
  const { data, loading, error, fetchMore, subscribeToMore } = useGetGroupQuery(params?.groupId)


  const handleFetchMoreMessages = () => {
      fetchMore({
        query: GET_GROUP_MESSAGES,
        variables: {
          groupId: params.groupId,
          offset: data.getGroup.messages.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const { messages: lastPage } = prev.getGroup;
          const { messages: nextPage } = fetchMoreResult.getGroup;
          const combined = [ ...nextPage, ...lastPage]
          const { getGroup } = prev;
          return { getGroup: { ...getGroup, messages: combined } }
        }
      })
  }

  
  useEffect(() => {
    const config = groupSubscription(params?.groupId)
    const unsub = subscribeToMore(config)
    return () => unsub()
  },[])



  return (
    <Gradient style={styles.container} colors={['#136a8a','#032836']}>

      <GroupHeader groupId={params?.groupId}  
        numberOfUsers={data?.getGroup.users.length}
        onGoBack={() => setChatImages([])}
      />

      { loading && <ActivityIndicator color='#0eaaa7' size={64} style={{ paddingTop: '50%' }}/> }
      { data?.getGroup.messages.length === 0 && (
        <View style={styles.newGroup}>
          <Avatar source={{ uri: data.getGroup.avatar.url }} title={data.getGroup.name[0]} containerStyle={styles.avatar} size={150} rounded/>
          <Text style={styles.createdBy}>{data.created_by.details.fullName} created a new group</Text>
          <Text style={styles.createdAt}>at {formatTimeMessage(data.createdAt)}</Text>
        </View>  
      )}
      { data?.getGroup.messages.length > 0 && (
        <FlatList data={[...data?.getGroup.messages].reverse()}
          ListFooterComponent={loading && <ActivityIndicator size={32}/>}
          contentContainerStyle={styles.messagesContainer}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            item.type === 'TEXT' ? <TextMessage data={item}/> :
            item.type === 'MEDIA' ? <MediaMessage data={item}/> : null
          )}
          onEndReachedThreshold={.2}
          onEndReached={handleFetchMoreMessages} 
          inverted={true} onScroll={onScroll}
          ref={flatListRef}
        />
      )}

      <ScrollToTopButton arrowUp={false}
        showScrollToTop={showScrollButton} 
        onPress={handleScrollToTop} 
        style={{ bottom: 78, right: 16 }}
      />

      <MessageBar/>
    </Gradient>
  )
}

export default GroupScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fefefe'
  },  
  messagesContainer: {
    width: '100%',
    minHeight: '100%',
    paddingTop: 100,
    paddingBottom: 20
  },
  chevron: {
    marginTop: 12,
    paddingLeft: 2,
    paddingTop: 2,
    backgroundColor: '#fefefe', 
    borderRadius: 20,
    height: 32,
    width: 32,
    shadowColor: 'black',
    shadowOpacity: .1,
    shadowOffset: { height: 4 },
    ShadowRadius: 12
  },
  newGroup: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10%'
  },
  createdBy: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '300',
    color: '#fefefe'
  },
  createdAt: {
    fontSize: 14,
    fontWeight: '300',
    color: '#fefefe',
    marginTop: 6,
  }
})