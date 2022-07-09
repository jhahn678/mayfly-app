import { Platform, StyleSheet, Text, View } from 'react-native'
import { Avatar } from '@rneui/themed'
import { formatTimeMessage } from '../../../utils/format-dates'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../../store/context/auth'
import Gradient from '../../backgrounds/Gradient'

const TextMessage = ({ data }) => {
    
    const [isAuthor, setIsAuthor] = useState(false)
    const { user } = useAuthContext()

    useEffect(() => {
        if(data.user._id === user._id)
        setIsAuthor(true)
    },[])
    
    return (
        <View style={isAuthor ? styles.containerAuthor : styles.container}>
            {!isAuthor && 
                <Avatar source={{ uri: data.user.details.avatar.url }} 
                    rounded title={data.user.details.fullName[0]}
                    size={36} containerStyle={styles.avatar}
                />
            }
            <Gradient style={isAuthor ? styles.bubbleAuthor : styles.bubble} colors={ isAuthor ? ['#a0cfcd','#a7d3d1'] : ['#a8cad7', '#bdd8e1']}>
                { user._id !== data.user._id && (
                    <View style={styles.header}>
                        <Text style={{ color: '#2b515f'}}>{data.user.details.fullName}</Text>
                    </View> 
                )}
                <Text style={styles.body}>{data.body}</Text>
                <Text style={{...styles.time, color: isAuthor ? '#254b48' : '#2b515f'}}>{formatTimeMessage(data.createdAt)}</Text>
            </Gradient>
        </View>
    )
}

export default TextMessage;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 8,
        paddingTop: 8,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 2,
        shadowOffset: { height: 2 }
    },  
    containerAuthor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 8,
        paddingTop: 8,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 2,
        shadowOffset: { height: 2 }
    },
    avatar: {
        borderWidth: .5,
        borderColor: 'rgba(53, 52, 64,.5)',
    },
    bubble: {
        maxWidth: '70%',
        minWidth: 80,
        borderRadius: 12,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 6,
        marginLeft: 6,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { height: 1 }
    },
    bubbleAuthor: {
        maxWidth: '70%',
        minWidth: 80,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 6,
        borderRadius: 12,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { height: 1 }
    },
    body: {
        paddingTop: 4
    },
    time: {
        alignSelf: 'flex-end',
        fontSize: 14,
        paddingTop: 4
    },
    header: {
        borderBottomWidth: .5,
        borderBottomColor: '#2b515f',
        marginBottom: 2
    }
})