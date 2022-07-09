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
import { useScrollToTopButton } from '../../hooks/utils/useScrollToTopButton'
import { useGetUserContactsQuery } from '../../hooks/queries/getUserContacts'

const ContactsScreen = () => {
  
    const { user } = useAuthContext()
    const { data, loading, error } = useGetUserContactsQuery(user._id)

    const [filteredContacts, setFilteredContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    const [contactIds, setContactIds] = useState([])
    const [search, setSearch] = useState('')

    const [showNewContact, setShowNewContact] = useState(false)
    const { flatListRef, handleScrollToTop, onScroll, showScrollButton} = useScrollToTopButton()
  
    useEffect(() => {
        if(data?.getUser){
            setFilteredContacts([
                ...data.getUser.pending_contacts,
                ...data.getUser.contacts
            ])
            setContactIds(data.getUser.contacts.map(c => c._id))
        }
    },[data])

    const handleSearch = (value) => {
        setSearch(value)
        if(value === ''){
            setFilteredContacts([
                ...data.getUser.pending_contacts,
                ...data.getUser.contacts
            ])
        }else{
            setFilteredContacts(data.getUser.contacts.filter(c => c?.details && (
                c.details.fullName .startsWith(value) ||
                c.details.lastName.startsWith(value) ||
                c.details.username.startsWith(value)
            )))
        }
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

            <FlatList data={filteredContacts} ref={flatListRef}
                onScroll={e => onScroll(e)} showsVerticalScrollIndicator={false}
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

        <ScrollToTopButton showScrollToTop={showScrollButton} onPress={handleScrollToTop}/>

        <NewContactBottomSheet isVisible={showNewContact} 
            setIsVisible={setShowNewContact} 
            usersContacts={contactIds}/>

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