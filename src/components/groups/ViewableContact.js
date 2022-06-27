import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Avatar } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core'

const ViewableContact = ({ item, selectedContacts, setSelectedContacts }) => {
    
    const navigation = useNavigation()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        selectedContacts.includes(item._id) ?
        setIsSelected(true) : setIsSelected(false)
    },[selectedContacts])

    const onPress = () => {
        // navigation.navigate('User')
    }

    const onSelect = () => {
        setSelectedContacts(contacts => (
            contacts.includes(item._id) ?
            contacts.filter(c => c !== item._id) : 
            [...contacts, item._id]
        ))
    }

    return (
        <TouchableOpacity style={isSelected ? {...styles.container, borderColor: '#0eaaa7', borderWidth: 1.5 } : styles.container}
            onPress={selectedContacts.length > 0 ? onSelect : onPress} onLongPress={onSelect}
        >
            <Avatar source={{ uri: item.details.avatar.url }} size={52} rounded containerStyle={{ marginLeft: 10 }}/>
            <View style={{ display: 'flex', paddingLeft: 8}}>
                <Text>{item.details.fullName}</Text>
                <Text style={styles.username}>@{item.details.username}</Text>
            </View>
            { selectedContacts.length > 0 && 
                <View style={isSelected ? {...styles.select, ...styles.selected} : styles.select}>
                    {isSelected && <IonIcon name='md-checkmark' size={24} style={styles.selectedIcon} />}
                </View>
            }
        </TouchableOpacity>
    )
}

export default ViewableContact;

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
    select: {
        height: 36, 
        width: 36,
        borderColor: 'rgba(53, 52, 64, .3)',
        borderWidth: 1,
        position: 'absolute',
        right: 12,
        borderRadius: 50,
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