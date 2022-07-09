import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Avatar } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'

const NewContactListItem = ({ item, isAdded }) => {

    //Show icon for send request
    //Sent + checkmark after sending
    //bordder change after send

    const [requestSent, setRequestSent] = useState(false)

    const handleSendRequest = async () => {
        setRequestSent(true)
    }

    const handleCancelRequest = async () => {
        setRequestSent(false)
    }

    return (
        <View style={styles.container}>
            <Avatar source={{ uri: item.details.avatar.url }} size={52} rounded containerStyle={{ marginLeft: 10 }}/>
            <View style={{ display: 'flex', paddingLeft: 8}}>
                <Text>{item.details.fullName}</Text>
                <Text style={styles.username}>@{item.details.username}</Text>
            </View>
            <View style={styles.select}>
                { isAdded ? (
                    <Text>Added</Text> ):( 
                    requestSent )?(
                        <IonIcon 
                            name='checkmark-circle-outline' 
                            size={28} color='green'
                            onPress={handleCancelRequest} 
                        />
                    ):(
                        <IonIcon 
                            name='person-add-outline' 
                            size={28} 
                            onPress={handleSendRequest}
                        /> 
                    )
                }
            </View>
        </View>
    )
}

export default NewContactListItem

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
    username: {
        fontSize: 12,
        fontWeight: '300',
        color: 'rgba(53, 52, 64, .6)'
    },
    select: {
        position: 'absolute',
        right: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        backgroundColor: '#0eaaa7',
        borderColor: '#0eaaa7'
    },
    selectedIcon: {
        color: '#fefefe'
    }
})