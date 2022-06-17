import { useTheme } from '@react-navigation/native'
import { Avatar, FAB, Input } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import IonIcon from 'react-native-vector-icons/Ionicons'
import CreateHeader from '../../components/headers/CreateHeader'
import { fakeContacts } from '../../../test-data/groups'
import ContactListItem from '../../components/groups/ContactListItem'
import { useImagePicker } from '../../hooks/utils/useImagePicker'

const NewGroupScreen = () => {

  //Mock contacts from user
  const [contacts, setContacts] = useState(fakeContacts)
  const [filteredContacts, setFilteredContacts] = useState([])

  useEffect(() => {
      setFilteredContacts(contacts)
  },[contacts])

  const [selectedContacts, setSelectedContacts] = useState([])
  const [groupName, setGroupName] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = (value) => {
      setSearch(value)
      setFilteredContacts(contacts.filter(c => (
          c.details.firstName.startsWith(value) ||
          c.details.lastName.startsWith(value) ||
          c.details.username.startsWith(value)
      )))
  }

  const openImagePicker = useImagePicker()
  const [groupImage, setGroupImage] = useState(null)

  const handlePickImage = async () => {
      const { cancelled, type, ...image } = await openImagePicker()
      if(cancelled === false) setGroupImage(image)
  }

  const handleNewGroup = () => {
    //Create new group and navigate to it
  }
  

  return (
    <PrimaryBackground style={styles.container}>
        <CreateHeader title='New Group' color='white' 
          rightNode={
            <FAB disabled={selectedContacts.length === 0}
              icon={<IonIcon name='return-down-forward' size={24}/>} 
              style={{ ...styles.next, ...globalStyles.boxShadowBottom}} 
              disabledStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)', opacity: .4 }}
              onPress={handleNewGroup}
            />
          }
        />
        <View style={styles.avatarSection}>
          <Avatar size={84} 
            icon={{ name: 'image-plus', type: 'material-community' }} 
            containerStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)'}} 
            rounded source={{ uri: groupImage?.uri }} onPress={handlePickImage}
          />
          <View style={styles.nameSection}>
            <TextInput placeholder='Group name'
              placeholderTextColor='rgba(53, 52, 64, .4)'
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />
            <Text style={styles.contactsSelected}>{`${selectedContacts.length} contacts selected`}</Text>
          </View>
        </View>
        <View style={styles.main}>
            <Input placeholder='Contacts' containerStyle={styles.searchContacts}
              rightIcon={<IonIcon name='search-outline' size={24}/>}
              value={search} onChangeText={value => handleSearch(value)}
              inputStyle={{ color: '#353440', fontSize: 18 }}
            />
            <FlatList
              data={filteredContacts}
              renderItem={({ item }) => <ContactListItem item={item} setSelectedContacts={setSelectedContacts}/>}
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
    fontSize: 24
  },
  contactsList: {
    display: 'flex',
    alignItems: 'center'
  }
})