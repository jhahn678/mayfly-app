import { StyleSheet, View } from 'react-native'
import { BottomSheet, Input } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import NewContactListItem from './NewContactListItem'
import { makeFakeContacts } from '../../../test-data/groups'
import { useDeviceContacts } from '../../hooks/utils/useDeviceContacts'
import DeviceContactsListItem from './DeviceContactsListItem'

const NewContactBottomSheet = ({ isVisible, setIsVisible }) => {
    
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [deviceContacts, setDeviceContacts] = useState({ data: [], bindex: 30 })
    const { getDeviceContacts } = useDeviceContacts()

    useEffect(() => {
        if(deviceContacts.data.length === 0){
            (async () => {
                const { data } = await getDeviceContacts()
                const contacts = data.filter(c => (
                    c.hasOwnProperty('phoneNumbers')) && (c.phoneNumbers.find(p => p.label === 'mobile')
                ))
                setDeviceContacts({ data: contacts, index: 30 })
            })()
        }
    },[])

    useEffect(() => {
        if(isVisible){
            setTimeout(() => {
                setDeviceContacts(c => ({ ...c, index: c.data.length-1 }))
            },1000)
        }
    },[isVisible])

    const handleClose = () => {
        setDeviceContacts(c => ({ ...c, index: 30 }))
        setIsVisible(false)
    }

    const handleSearch = async (v) => {
        setSearch(v)
        if(v.length > 0){
            setSearchResults([
                ...makeFakeContacts(4), 
                ...deviceContacts.data.filter(c => c.name.startsWith(v))
            ])
        }else{
            setSearchResults([])
        }
    }

    const handleSendRequest = () => {

    }
    
    return (
        <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}
            scrollViewProps={{ 
                contentContainerStyle: styles.contentContainer, 
                style: styles.container
            }} 
        >
            <Input placeholder='Search by username' containerStyle={styles.search}
                rightIcon={selectedUser ? (
                    <IonIcon name='md-checkmark' size={24} 
                        onPress={handleSendRequest} style={styles.send}
                    /> ):(
                    <IonIcon name='search-outline' size={24}/>
                )}
                value={search} onChangeText={value => handleSearch(value)}
                inputStyle={{ color: '#353440', fontSize: 18 }}
            />
            <View style={{ paddingHorizontal: 16 }}>
            { searchResults.map(item => {
                if(item.hasOwnProperty('_id')){
                    return <NewContactListItem key={item._id} item={item}/>
                }else{
                    return <DeviceContactsListItem key={item.id} item={item}/>
                }
            })}
            { searchResults.length === 0 && deviceContacts.data.slice(0, deviceContacts.index).map(item => (
                <DeviceContactsListItem key={item.id} item={item}/>
            ))}
            </View>
        </BottomSheet>
    )
}

export default NewContactBottomSheet

const styles = StyleSheet.create({
    container: {
        height: '85%', 
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    contentContainer: {
        minHeight: '100%', 
        width: '100%',
        backgroundColor: '#fefefe',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    search: {
        width: '92%',
        alignSelf: 'center',
        paddingTop: 12,
        fontSize: 24,
    },
    send: {
        backgroundColor: '#0eaaa7',
        padding: 4,
        borderRadius: 16,
        overflow: 'hidden'
    }
})