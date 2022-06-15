import { StyleSheet, Text, View, FlatList } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupHeader from '../../components/headers/GroupHeader'
import { makeFakeGroup } from '../../../test-data/groups'
import MessageBar from '../../components/groups/MessageBar'
import Message from '../../components/groups/Message'

const GroupScreen = ({ route }) => {

  const groupId = route.params._id
  // Make a fetch for group
  const data = makeFakeGroup(25, 8)

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
  }
})