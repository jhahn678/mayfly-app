import { useState } from 'react'
import { StyleSheet, View, FlatList, Animated, TouchableOpacity,  } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupHeader from '../../components/headers/GroupHeader'
import { makeFakeGroup } from '../../../test-data/groups'
import MessageBar from '../../components/groups/MessageBar'
import Message from '../../components/groups/Message'
import IonIcon from 'react-native-vector-icons/Ionicons'
import NewCatchButton from '../../components/buttons/NewCatchButton'
import NewPlaceButton from '../../components/buttons/NewPlaceButton'
import ShareImageButton from '../../components/buttons/ShareImageButton'
import { useToggleAnimation } from '../../hooks/utils/useToggleAnimation'

const GroupScreen = ({ route }) => {

  const { 
    ref: buttonTranslate, 
    toggledOn: expandButtons, 
    setToggledOn: setExpandButtons 
  } = useToggleAnimation({ initialValue: 300 })


  const groupId = route.params._id
  // Make a fetch for group
  const [data, setData] = useState(makeFakeGroup(25, 8))

  return (
    <PrimaryBackground>
      <GroupHeader groupId={data._id} 
        name={data.name} 
        avatar={data.avatar.url} 
        numberOfUsers={data.users.length}
      />
      <FlatList data={data.messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Message message={item}/>}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={{...styles.buttonContainer }}>
        <Animated.View style={{...styles.actions, transform: [{ translateY: buttonTranslate }]}}>
          <NewCatchButton groupId={data._id}/>
          <NewPlaceButton groupId={data._id}/>
          <ShareImageButton groupId={data._id}/>
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
    paddingBottom: 100
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
  }
})