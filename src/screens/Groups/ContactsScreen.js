import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Input, FAB } from '@rneui/themed'
import { useState, useEffect, useRef } from 'react'
import { makeFakeContacts, makeFakePendingRequests } from '../../../test-data/groups'
import IonIcon from 'react-native-vector-icons/Ionicons' 
import CreateHeader from '../../components/headers/CreateHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import { useAuthContext } from '../../store/context/auth'
import { globalStyles } from '../../styles/globalStyles'
import PendingContactsListItem from '../../components/groups/PendingContactsListItem'
import ScrollToTopButton from '../../components/buttons/ScrollToTopButton'
import ViewableContact from '../../components/groups/ViewableContact'
import NewContactBottomSheet from '../../components/groups/NewContactBottomSheet'


const ContactsScreen = () => {
  
    const { user } = useAuthContext()
    const [contacts, setContacts] = useState([ ...makeFakePendingRequests(3), ...makeFakeContacts(12) ])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [search, setSearch] = useState('')
    const [selectedContacts, setSelectedContacts] = useState([])
    const flatListRef = useRef()
    const [showScrollToTop, setShowScrollToTop] = useState(false) 
    const [showNewContact, setShowNewContact] = useState(false)
  
    useEffect(() => {
        setFilteredContacts(contacts)
    },[contacts])

    const handleSearch = (value) => {
        setSearch(value)
        if(value === ''){
            setFilteredContacts(contacts)
        }else{
            setFilteredContacts(contacts.filter(c => c?.details && (
                c.details.firstName.startsWith(value) ||
                c.details.lastName.startsWith(value) ||
                c.details.username.startsWith(value)
            )))
        }
    }

    const handleScrollToTop = () => {
        flatListRef.current.scrollToOffset({ offset: 0 })
    }

    const onScroll = ({ nativeEvent: { contentOffset: { y } }}) => {
        if(y > 600) return setShowScrollToTop(true)
        if(y <= 600) return setShowScrollToTop(false)
    }


    const handleDelete = () => {

    }



  
    return (
    <PrimaryBackground style={styles.container}>
        <CreateHeader title='Contacts' rightNode={
            <FAB icon={<IonIcon name={selectedContacts.length > 0 ? 'trash-outline' : 'person-add-outline'} size={24} color='#fefefe'/>} 
                style={globalStyles.FABshadow} 
                disabledStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)', opacity: .4 }}
                onPress={selectedContacts.length > 0 ? handleDelete : () => setShowNewContact(true) }
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
                ref={flatListRef}
                onScroll={e => onScroll(e)}
                renderItem={({ item }) => ( item?.status ? 
                    <PendingContactsListItem item={item}/> :
                    <ViewableContact item={item} 
                        selectedContacts={selectedContacts} 
                        setSelectedContacts={setSelectedContacts}
                    />
                )}
                keyExtractor={item => item?.status ? item.user._id : item._id }
                contentContainerStyle={styles.contactsList}
                ItemSeparatorComponent={() => <View style={{ height: 5 }}/>}
            />
        </View>
        <ScrollToTopButton showScrollToTop={showScrollToTop} onPress={handleScrollToTop}/>
        <NewContactBottomSheet isVisible={showNewContact} setIsVisible={setShowNewContact}/>
    </PrimaryBackground>
  )
}

export default ContactsScreen

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