import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Avatar } from '@rneui/themed'
import { useSendSMSInvite } from '../../hooks/utils/useSendSMSInvite'
import Gradient from '../backgrounds/Gradient'

const  DeviceContactsListItem = ({ item }) => {

    const { sendSMSInvite } = useSendSMSInvite()
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        const mobile = item.phoneNumbers.find(p => p.label === 'mobile')
        setPhoneNumber(mobile?.number)
    },[])

    const handleInvite = async () => {
        await sendSMSInvite(phoneNumber)
    }

    return (
        <View style={styles.container}>
            { item.imageAvailable ? 
                <Avatar source={{ uri: item.image }} 
                    size={52} rounded containerStyle={{ marginLeft: 10 }}
                /> :
                <Avatar size={52} rounded containerStyle={{ marginLeft: 10, backgroundColor: '#0eaaa7' }}
                    title={`${item.firstName ? item.firstName[0] : item.name[0]}${item.lastName ? item.lastName[0] : ''}`}
                />
            }
            <View style={{ display: 'flex', paddingLeft: 8}}>
                <Text>{item.name}</Text>
                <Text style={styles.phone}>{phoneNumber}</Text>
            </View>
        
            <TouchableOpacity onPress={handleInvite} style={styles.shadow}>
                <Gradient style={styles.invite}>
                    <Text style={{ fontSize: 10, color: '#fff'}}>Invite</Text>
                </Gradient>
            </TouchableOpacity>
        </View>
    )
}

export default DeviceContactsListItem

const styles = StyleSheet.create({ 
    container: {
        height: 68,
        minWidth: '92%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(53, 52, 64, .3)',
        borderRadius: 12,
        marginBottom: 6
    },
    phone: {
        fontSize: 12,
        fontWeight: '300',
        color: 'rgba(53, 52, 64, .6)'
    },
    shadow: {
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: { height: 1 },
        shadowOpacity: .1,
        shadowRadius: 1,
        position: 'absolute',
        right: 28,
    },
    invite: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        fontSize: 10,
        color: '#fefefe',
        marginLeft: 8
    }
})