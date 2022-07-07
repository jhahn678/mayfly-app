import { StyleSheet, View, FlatList, Animated, TouchableOpacity, Text, ActivityIndicator} from 'react-native'
import { useEffect } from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupHeader from '../../components/headers/GroupHeader'
import { formatTimeMessage } from '../../utils/format-dates'
import MessageBar from '../../components/groups/MessageBar'
import Message from '../../components/groups/Message'
import IonIcon from 'react-native-vector-icons/Ionicons'
import NewCatchButton from '../../components/buttons/NewCatchButton'
import NewPlaceButton from '../../components/buttons/NewPlaceButton'
import ShareImageButton from '../../components/buttons/ShareImageButton'
import { useToggleAnimation } from '../../hooks/utils/useToggleAnimation'
import { Avatar } from '@rneui/themed'
import { useRoute } from '@react-navigation/core'
import { useImageContext } from '../../store/context/image'
import { useGetGroupQuery } from '../../hooks/queries/getGroup'
import { groupSubscription } from '../../hooks/subscriptions/getGroupSubscription'


const GroupScreen = () => {

  const { setChatImages } = useImageContext()
  const { params } = useRoute()
  const { data, loading, error, subscribeToMore } = useGetGroupQuery(params?.groupId)

  const { 
    ref: buttonTranslate, 
    toggledOn: expandButtons, 
    setToggledOn: setExpandButtons 
  } = useToggleAnimation({ initialValue: 300 })

  
  // useEffect(() => {
  //   subscribeToMore(groupSubscription(params?.groupId))
  // },[])



  
  return (
    <PrimaryBackground>

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
        <FlatList data={data?.getGroup.messages}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Message message={item}/>}
          contentContainerStyle={styles.messagesContainer}
          inverted={true}
        />
      )}
      
      <View style={{...styles.buttonContainer }}>
        <Animated.View style={{...styles.actions, transform: [{ translateY: buttonTranslate }]}}>
          <NewCatchButton groupId={params?.groupId}/>
          <NewPlaceButton groupId={params?.groupId}/>
          <ShareImageButton/>
        </Animated.View>
        <TouchableOpacity onPress={() => setExpandButtons(e => !e)}
          style={{...styles.chevron, transform: [{ rotate: expandButtons ? '180deg' : '0deg' }]}}
        >
          <IonIcon name='chevron-down' size={28}/>
        </TouchableOpacity>
      </View>

      <MessageBar/>
    </PrimaryBackground>
  )
}

export default GroupScreen

const styles = StyleSheet.create({
  messagesContainer: {
    width: '100%',
    minHeight: '100%',
    paddingTop: 100,
    paddingBottom: 20
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 208,
    position: 'absolute',
    bottom: 76,
    right: 12
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 148
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