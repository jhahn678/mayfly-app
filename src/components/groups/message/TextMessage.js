import { StyleSheet, Text, View, Image } from 'react-native'
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
            <Gradient style={isAuthor ? styles.bubbleAuthor : styles.bubble} colors={ isAuthor ? ['#06beb6','#48b1bf'] : ['#F6F4F3', '#F4F5F2']}>
                <Text style={{ fontWeight: '500'}}>{data.body}</Text>
                <Text>{formatTimeMessage(data.createdAt)}</Text>
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
        backgroundColor: 'rgba(53, 52, 64,.3)',
        borderRadius: 20,
        padding: 16,
        paddingTop: 8,
        paddingBottom: 16,
        marginLeft: 6,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 1,
        shadowOffset: { height: 1 }
    },
    bubbleAuthor: {
        maxWidth: '70%',
        minWidth: 80,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 6,
        borderRadius: 20,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 1,
        shadowOffset: { height: 1 }
    },
})