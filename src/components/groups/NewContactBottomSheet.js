import { StyleSheet, View } from 'react-native'
import { BottomSheet, Input } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import NewContactListItem from './NewContactListItem'
import { useDeviceContacts } from '../../hooks/utils/useDeviceContacts'
import { useSearchByUsername } from '../../hooks/utils/useSearchByUsername'
import DeviceContactsListItem from './DeviceContactsListItem'

const NewContactBottomSheet = ({ isVisible, setIsVisible, usersContacts }) => {
    
    const { getDeviceContacts } = useDeviceContacts()
    //deviceContacts.index inidicates the number of contacts to display
    const [deviceContacts, setDeviceContacts] = useState({ data: [], filtered: [], index: 30 })

    const { input, setInput, results, isError, isLoading } = useSearchByUsername()

    useEffect(() => {
        //Initial cleaning of data ~ Only contacts with mobile phone numbers
        if(deviceContacts.data.length === 0){
            (async () => {
                const { data } = await getDeviceContacts()
                const contacts = data.filter(c => (
                    c.hasOwnProperty('phoneNumbers')) && (c.phoneNumbers.find(p => p.label === 'mobile')
                ))
                setDeviceContacts(state => ({ ...state, data: contacts }) )
            })()
        }
    },[])


    useEffect(() => {
        if(isVisible){
            setTimeout(() => {
                setDeviceContacts(state => ({ ...state, index: state.data.length-1 }))
            },1000)
        }
    },[isVisible])


    const handleClose = () => {
        setDeviceContacts(state => ({ ...state, index: 30 }))
        setIsVisible(false)
    }


    const handleInput = (v) => {
        setInput(v)
        if(v.length > 0){
            const filtered = [ ...deviceContacts.data.filter(c => c.name.startsWith(v)) ]
            setDeviceContacts(state => ({ ...state, filtered }) )
        }else{
            setDeviceContacts(state => ({ ...state, filtered: [] }))
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
                rightIcon={<IonIcon name='search-outline' size={24}/>}
                value={input} onChangeText={value => handleInput(value)}
                inputStyle={{ color: '#353440', fontSize: 18 }}
            />


            <View style={{ paddingHorizontal: 16 }}>

                {  results?.length > 0 && input.length > 0 &&
                    results.map(item => (
                        <NewContactListItem key={item._id} item={item} 
                            isAdded={usersContacts.includes(item._id)}
                        />
                ))}

                { deviceContacts.filtered.length > 0 && deviceContacts.filtered.map(item => ( 
                    <DeviceContactsListItem key={item.id} item={item}/>
                ))}
            
                { input.length === 0 && 
                    deviceContacts.data.slice(0, deviceContacts.index).map(item => (
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