import { useTheme } from '@react-navigation/native'
import { Avatar, Input } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import IonIcon from 'react-native-vector-icons/Ionicons'
import CreateHeader from '../../components/headers/CreateHeader'
import { fakeContacts } from '../../../test-data/groups'
import ContactListItem from '../../components/groups/ContactListItem'

const NewGroupScreen = () => {

  const [selected, setSelected] = useState(0)
  const [groupName, setGroupName] = useState('')
  const [search, setSearch] = useState('')
  
  const theme = useTheme()

  return (
    <PrimaryBackground style={styles.container}>
        <CreateHeader title='New Group' color='white'/>
        <View style={styles.avatarSection}>
          <Avatar size={84} 
            icon={{ name: 'image-plus', type: 'material-community' }} 
            containerStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)'}} 
            rounded
          />
          <View style={styles.nameSection}>
            <TextInput placeholder='Group name'
              placeholderTextColor='rgba(53, 52, 64, .5)'
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />
            <Text style={styles.contactsSelected}>{`${selected} contacts selected`}</Text>
          </View>
        </View>
        <View style={styles.main}>
            <Input placeholder='Contacts' containerStyle={styles.searchContacts}
              rightIcon={<IonIcon name='search-outline' size={24}/>}
              value={search} onChangeText={setSearch}
              inputStyle={{ color: '#353440', fontSize: 18 }}
            />
            <FlatList
              data={fakeContacts}
              renderItem={({ item }) => <ContactListItem item={item}/>}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.contactsList}
              ItemSeparatorComponent={() => <View style={{ height: 5 }}/>}
            />
        </View>
    </PrimaryBackground>
  )
}

export default NewGroupScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3ea9e2'
  },
  avatarSection: {
    marginTop: 6,
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameSection: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  contactsSelected: {
    margin: 0,
    padding: 0,
    paddingLeft: 14,
    color: '#fefefe'
  },
  input: {
    fontSize: 24,
    marginLeft: 10,
    paddingLeft: 2,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(53, 52, 64, .3)',
    color: '#fefefe',
  },
  main: {
    height: '75%',
    width: '100%',
    backgroundColor: '#fefefe',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  searchContacts: {
    width: '92%',
    alignSelf: 'center',
    paddingTop: 12,
    fontSize: 24,
  },
  contactsList: {
    display: 'flex',
    alignItems: 'center'
  }
})