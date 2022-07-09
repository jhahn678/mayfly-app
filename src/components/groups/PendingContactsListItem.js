import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from '@rneui/themed'
import Gradient from '../backgrounds/Gradient'


const PendingContactsListItem = ({ item }) => {

    const handleAcceptRequest = () => {

    }

    const handleDenyRequest = () => {

    }
    
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {}}
         >
            <Avatar source={{ uri: item.user.details?.avatar.url }} 
                size={52} rounded containerStyle={{ marginLeft: 10 }}
                title={`${item.user.details.firstName[0]}${item.user.details.lastName[0]}`}
            />
            <View style={{ display: 'flex', paddingLeft: 8}}>
                <Text style={styles.fullname}>{item.user.details.fullName}</Text>
                <Text style={styles.username}>@{item.user.details.username}</Text>
            </View>
            <View style={styles.actions}>
                { item.status === 'TO' ? 
                    <TouchableOpacity><Text style={styles.cancel}>Cancel</Text></TouchableOpacity> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleAcceptRequest(item.user._id)} style={styles.shadow}>
                            <Text style={styles.deny}>Ignore</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDenyRequest(item.user._id)} style={styles.shadow}>
                            <Gradient style={styles.accept}>
                                <Text style={{ fontSize: 10, color: '#fff'}}>Accept</Text>
                            </Gradient>
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
        backgroundColor: '#ececec',
        borderColor: '#cfcfcf',
        borderWidth: .5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 10,
        color: 'rgb(80,80,80)'
    },
    accept: {
        backgroundColor: '#a8cad7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 10,
        color: '#fefefe',
        marginLeft: 8,
    },
    deny: {
        backgroundColor: '#ececec',
        borderColor: '#cfcfcf',
        borderWidth: .5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 10,
        color: '#000'
    },
    shadow: {
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: { height: 1 },
        shadowOpacity: .1,
        shadowRadius: 1
    }
})