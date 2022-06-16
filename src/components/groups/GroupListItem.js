import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Badge } from "@rneui/themed";
import { formatDateGroupList } from '../../utils/format-dates';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';

const GroupListItem = ({ item, selectedItems, setSelectedItems }) => {

    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if(selectedItems.find(i => i === item._id)){
            setIsSelected(true)
        }else{
            setIsSelected(false)
        }
    },[selectedItems])

    const navigation = useNavigation()

    const onPress = () => navigation.navigate('GroupScreen', { _id: item._id})

    const onSelect = () => {
        if(selectedItems.includes(item._id)){
            setSelectedItems(items => items.filter(i => i !== item._id))
        }else{
            setSelectedItems(items => [...items, item._id])
        }
    }

    return (
        <TouchableOpacity onPress={selectedItems.length > 0 ? onSelect : onPress} onLongPress={onSelect}>
            <View style={isSelected ? {...styles.container, ...styles.selected} : styles.container}>
                <Avatar rounded size={72}
                    source={{ uri: item.latest_message.user.details.avatar.url }} 
                    containerStyle={isSelected ? {...styles.avatar, ...styles.avatarSelected} : styles.avatar}
                />
                <View style={styles.right}>
                    <View style={styles.header}>
                        <Text>{ item.name }</Text>
                        <Text style={styles.date}>{ formatDateGroupList(item.updatedAt) }</Text>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.body}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{ item.latest_message.body }
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{ fontWeight: '200', fontSize: 10, paddingRight: 4, fontStyle: 'italic' }}>from</Text>
                        <Text style={{ fontWeight: '300', fontSize: 12 }}>{ item.latest_message.user.details.firstName }</Text>
                    </View>
                </View>
            </View>
            { selectedItems.length === 0 && <Badge value={2} status='success' containerStyle={{ position: 'absolute', top: -5, right: 5 }}/> }
            { !item &&
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
            }
        </TouchableOpacity>
    )
}

export default GroupListItem

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        height: 90,
        width: '97%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 8,
        padding: 9,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1, 
        borderColor: 'rgba(53, 52, 64, .3)',
        backgroundColor: '#fefefe'
    },
    selected: {
        borderColor: '#0eaaa7',
        borderWidth: 2, 
    },
    avatar: {
        borderWidth: 1, 
        borderColor: 'rgba(53, 52, 64, .3)'
    },
    avatarSelected: {
        borderWidth: 2,
        borderColor: '#0eaaa7'
    },
    right: {
        display: 'flex',
        flexGrow: 1,
        width: '80%',
        marginLeft: 8,
        paddingRight: 12
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(53, 52, 64, .3)'
    },
    title: {
        fontWeight: '300',
        fontSize: 12,
    },
    date: {
        fontWeight: '200',
        fontSize: 12,
    },
    main: {
        flexGrow: 1,
        width: '100%',
        paddingRight: 8,
        paddingTop: 4
    },
    body: {
        fontWeight: '200',
        fontSize: 12
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    }
})