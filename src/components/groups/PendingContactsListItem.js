import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from '@rneui/themed'


const PendingContactsListItem = ({ item }) => {

    const handleAcceptRequest = () => {

    }

    const handleDenyRequest = () => {

    }
    
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {}}
         >
            <Avatar source={{ uri: item.user.details.avatar.url }} size={52} rounded containerStyle={{ marginLeft: 10 }}/>
            <View style={{ display: 'flex', paddingLeft: 8}}>
                <Text style={styles.fullname}>{item.user.details.fullName}</Text>
                <Text style={styles.username}>@{item.user.details.username}</Text>
            </View>
            <View style={styles.actions}>
                { item.status === 'TO' ? 
                    <TouchableOpacity><Text style={styles.cancel}>Cancel</Text></TouchableOpacity> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleAcceptRequest(item.user._id)}>
                            <Text style={styles.deny}>Deny</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDenyRequest(item.user._id)}>
                            <Text style={styles.accept}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

export default PendingContactsListItem

const styles = StyleSheet.create({
    container: {
        height: 68,
        minWidth: '92%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(53, 52, 64, .3)',
        borderRadius: 12
    },
    username: {
        fontSize: 12,
        fontWeight: '300',
        color: 'rgba(53, 52, 64, .6)'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 12,
    },
    cancel: {
        backgroundColor: 'rgb(220,220,220)',
        borderColor: 'rgb(80,80,80)',
        borderWidth: .5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 10,
        color: 'rgb(80,80,80)'
    },
    accept: {
        backgroundColor: 'rgba(0,255,0,.1)',
        borderColor: 'green',
        borderWidth: .5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 10,
        color: 'rgb(80,80,80)',
        marginLeft: 8
    },
    deny: {
        backgroundColor: 'rgba(255,0,0,.1)',
        borderColor: 'red',
        borderWidth: .5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 10,
        color: 'rgb(80,80,80)'
    }
})