import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Badge } from "@rneui/themed";
import { formatDateGroupList } from '../../utils/format-dates';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';

const GroupListItem = ({ item, selectedItems, setSelectedItems, subscribeToUpdates=null }) => {

    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        selectedItems.find(i => i === item._id) ? 
        setIsSelected(true) : setIsSelected(false)
    },[selectedItems])

    useEffect(() => {
        if(subscribeToUpdates) subscribeToUpdates()
    },[])

    

    const navigation = useNavigation()

    const onPress = () => navigation.navigate('GroupScreen', { groupId: item._id})

    const onSelect = () => {
        selectedItems.includes(item._id) ?
        setSelectedItems(items => items.filter(i => i !== item._id)) :
        setSelectedItems(items => [...items, item._id])
    }

    return (
        <TouchableOpacity onPress={selectedItems.length > 0 ? onSelect : onPress} onLongPress={onSelect}>
            <View style={isSelected ? {...styles.container, ...styles.selected} : styles.container}>
                <Avatar rounded size={72}
                    source={{ uri: item.avatar.url || item.latest_message.user.details.avatar.url }} 
                    containerStyle={isSelected ? {...styles.avatar, ...styles.avatarSelected} : styles.avatar}
                />
                <View style={styles.right}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{ item.name }</Text>
                    <View style={styles.main}>
                        <Text style={styles.body} numberOfLines={2} ellipsizeMode='tail'>
                            {item.latest_message.user.details && 
                                <Text style={styles.name}>{`${item.latest_message.user.details.firstName}: `}</Text>
                            }
                            { item.latest_message.body }
                        </Text>
                    </View>
                    <Text style={styles.date}>{ formatDateGroupList(item.latest_message.createdAt) }</Text>
                </View>
            </View>
            {/* <Badge value={2} status='success' containerStyle={{ position: 'absolute', top: -5, right: 5 }}/> */}
            {/* { !item &&
                <EntypoIcon name='pin' size={20} 
                    style={{ 
                        position: 'absolute', 
                        top: -10, 
                        left: 12,
                        color: '#262b2f'
                    }}
                />
            }
            { !item &&
                <IonIcon name='md-notifications-off-circle' size={24}
                    style={{
                        position: 'absolute',
                        top: -8,
                        right: 1,
                        color: '#262b2f'
                    }}
                />
            } */}
        </TouchableOpacity>
    )
}

export default GroupListItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefefe',
        // backgroundColor: 'rgba(14, 170, 167,.1)',
        borderBottomColor: 'rgba(53, 52, 64, .3)',
        borderBottomWidth: .3
    },
    selected: {
        borderColor: '#0eaaa7',
    },
    avatar: {
        borderWidth: 1, 
        borderColor: 'rgba(53, 52, 64, .3)'
    },
    avatarSelected: {
        borderColor: '#0eaaa7',
        borderWidth: 4
    },
    right: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: 12,
        paddingRight: 24
    },
    title: {
        fontWeight: '400',
        fontSize: 16,
        paddingRight: 24
    },
    date: {
        textAlign: 'right',
        fontWeight: '200',
        fontSize: 12
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 6,
        marginTop: 4,
        marginBottom: 8
    },
    name: {
        fontWeight: '400',
        fontSize: 14,
        marginRight: 12,
        color: '#0eaaa7'
    },
    body: {
        fontWeight: '200',
        fontSize: 14,
    }
})