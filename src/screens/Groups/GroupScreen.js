import { useState } from 'react'
import { StyleSheet, View, FlatList, Animated, TouchableOpacity, Text} from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupHeader from '../../components/headers/GroupHeader'
import { makeFakeGroup } from '../../../test-data/groups'
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
 

const GroupScreen = () => {

  const { setChatImages } = useImageContext()
  const route = useRoute()
  // const groupId = route.params._id

  const { 
    ref: buttonTranslate, 
    toggledOn: expandButtons, 
    setToggledOn: setExpandButtons 
  } = useToggleAnimation({ initialValue: 300 })

  const [data, setData] = useState(makeFakeGroup(20, 2))


  return (
    <PrimaryBackground>
      <GroupHeader groupId={data._id} 
        name={data.name} 
        avatar={data.avatar.url} 
        numberOfUsers={data.users.length}
        onGoBack={() => setChatImages([])}
      />

      { data?.messages.length === 0 ? (
        <View style={styles.newGroup}>
          <Avatar source={{ uri: data.avatar.url }} containerStyle={styles.avatar} size={150} rounded/>
          <Text style={styles.createdBy}>{data.created_by.details.fullName} created a new group</Text>
          <Text style={styles.createdAt}>at {formatTimeMessage(data.createdAt)}</Text>
        </View>  ):(
        <FlatList data={data.messages}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Message message={item}/>}
          contentContainerStyle={styles.messagesContainer}
          inverted={true}
        />
      )}
      
      <View style={{...styles.buttonContainer }}>
        <Animated.View style={{...styles.actions, transform: [{ translateY: buttonTranslate }]}}>
          <NewCatchButton groupId={data._id}/>
          <NewPlaceButton groupId={data._id}/>
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