import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Avatar } from '@rneui/themed'

const  DeviceContactsListItem = ({ item }) => {

    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        const mobile = item.phoneNumbers.find(p => p.label === 'mobile')
        setPhoneNumber(mobile?.number)
    },[])

    const handleInvite = async () => {

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
            <TouchableOpacity onPress={handleInvite} style={styles.inviteContainer}>
                <Text style={styles.invite}>Invite</Text>
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
    inviteContainer: {
        position: 'absolute',
        right: 28,

    },
    invite: {
        backgroundColor: 'rgb(220,220,220)',
        color: 'rgb(80,80,80)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderColor: 'rgb(80,80,80)',
        borderWidth: .5,
        fontSize: 10
    }
})