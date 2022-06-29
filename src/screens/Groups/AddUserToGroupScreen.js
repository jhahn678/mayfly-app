import { StyleSheet, View, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { makeFakeContacts } from '../../../test-data/groups'
import { globalStyles } from '../../styles/globalStyles'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../components/headers/CreateHeader'
import ContactListItem from '../../components/groups/ContactListItem'
import { FAB, Input } from '@rneui/themed'
import { useAuthContext } from '../../store/context/auth'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/core'


const AddUserToGroupScreen = () => {

    const { user } = useAuthContext()
    const route = useRoute()
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState(makeFakeContacts(20))
    const [filteredContacts, setFilteredContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])

    useEffect(() => {
        setFilteredContacts(contacts)
    },[contacts])

    const handleSearch = (value) => {
        setSearch(value)
        setFilteredContacts(contacts.filter(c => (
            c.details.firstName.startsWith(value) ||
            c.details.lastName.startsWith(value) ||
            c.details.username.startsWith(value)
        )))
    }

    const handleAddUsers = async () => {
        console.log(route.params.groupId)
        console.log(selectedContacts)
    }



    return (
        <PrimaryBackground style={styles.container}>
            <CreateHeader title='Add Users' rightNode={
                <FAB disabled={selectedContacts.length === 0}
                    icon={<IonIcon name='checkmark' size={24} color='#fefefe'/>} 
                    style={globalStyles.FABshadow} 
                    disabledStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)', opacity: .4 }}
                    onPress={handleAddUsers}
                />
            }/>
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

export default AddUserToGroupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3ea9e2'
    },
    main: {
        height: '85%',
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