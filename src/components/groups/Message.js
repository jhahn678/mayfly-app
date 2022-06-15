import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed'
import { formatTimeMessage } from '../../utils/format-dates'
import { useAuthContext } from '../../store/context/auth'

const Message = ({ message }) => {


    const { user } = useAuthContext()    



    return (
        <View style={user._id === message.user._id ? styles.containerAuthor : styles.container}>
            { message.user._id !== user._id &&
                <Avatar 
                    source={{ uri: message.user.details.avatar.url }} 
                    size={36} rounded containerStyle={styles.avatar}
                />
            }
            <View style={user._id === message.user._id ? {...styles.bubble, ...styles.bubbleAuthor} : styles.bubble}>
                { user._id !== message.user._id &&
                    <View style={styles.header}>
                        <Text style={{...styles.headerText}}>{message.user.details.fullName}</Text>
                        <Text style={{...styles.headerText, paddingLeft: 8}}>{formatTimeMessage(message.createdAt)}</Text>
                    </View>
                }        
                <Text style={styles.body}>{message.body}</Text>
                { user._id === message.user._id &&
                    <Text style={{...styles.headerText, ...styles.dateFromUser}}>
                        {formatTimeMessage(message.createdAt)}
                    </Text>
                }
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 8,
        paddingTop: 8
    },  
    containerAuthor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 8,
        paddingTop: 8
    },
    avatar: {
        borderWidth: .5,
        borderColor: 'rgba(53, 52, 64,.5)',
    },
    bubble: {
        maxWidth: '70%',
        minWidth: 80,
        backgroundColor: '#3ea9e2',
        borderRadius: 20,
        borderBottomLeftRadius: 3,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 16,
        marginLeft: 6
    },
    bubbleAuthor: {
        padding: 12,
        paddingTop: 10,
        paddingBottom: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 3,
        backgroundColor: '#0eaaa7',
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#fefefe',
        borderBottomWidth: .5,
        paddingBottom: 2
    },
    headerText: {
        fontSize: 12, 
        fontWeight: '300', 
        color: '#fefefe',
    },
    body: {
        fontSize: 14,
        color: '#fefefe',
        paddingTop: 4
    },
    dateFromUser: {
        alignSelf: 'flex-end',
        paddingTop: 4
    }
})