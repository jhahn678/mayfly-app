import { StyleSheet, Text, View, Image } from 'react-native'
import { Avatar } from '@rneui/themed'
import { formatTimeMessage } from '../../../utils/format-dates'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../../store/context/auth'
import Gradient from '../../backgrounds/Gradient'
import uuid from 'react-native-uuid'

const MediaMessage = ({ data }) => {
    
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

            <View style={styles.bubblesContainer}>
                
                {/* FIRST IMAGE */}
                <Gradient style={isAuthor ? styles.bubbleAuthor : styles.bubble} 
                    colors={ isAuthor ? ['#a0cfcd','#a7d3d1'] : ['#a8cad7', '#bdd8e1']}
                >
                    { user._id !== data.user._id && (
                        <View style={styles.header}>
                            <Text style={{ color: '#2b515f'}}>{data.user.details.fullName}</Text>
                        </View> 
                    )}

                    <Image source={{ uri: data.media[0].url }} resizeMode='cover' style={styles.image}/>

                    { data.media.length === 1 && data.body.length < 80 && <>
                        <Text style={styles.body}>{data.body}</Text>
                        <Text style={{...styles.time, color: isAuthor ? '#254b48' : '#2b515f'}}>
                            {formatTimeMessage(data.createdAt)}
                        </Text>
                    </>}
                </Gradient>

                {/* REMAINING IMAGES */}
                { data.media.length > 1  && data.media.slice(1).map(m => (
                    <Gradient style={isAuthor ? styles.bubbleAuthor : styles.bubble} key={uuid.v4()}
                        colors={ isAuthor ? ['#a0cfcd','#a7d3d1'] : ['#a8cad7', '#bdd8e1']}
                    >
                        <Image source={{ uri: m.url }} resizeMode='cover' style={styles.image}/>
                    </Gradient>
                ))}

                {/* MESSAGE BODY IF THERE IS ONE THAT WASNT ALREADY DISPLAYED*/}
                { data.media.length > 1  || data.body.length >= 80 &&
                    <Gradient style={isAuthor ? styles.captionAuthor : styles.caption} key={uuid.v4()}
                        colors={ isAuthor ? ['#a0cfcd','#a7d3d1'] : ['#a8cad7', '#bdd8e1']}
                    >
                        <Text style={styles.body}>{data.body}</Text>
                        <Text style={{...styles.time, color: isAuthor ? '#254b48' : '#2b515f'}}>
                            {formatTimeMessage(data.createdAt)}
                        </Text>
                    </Gradient>
                }

            </View>
                
        </View>
    )
}

export default MediaMessage;

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
    bubblesContainer: {
        maxWidth: '70%',
    },
    bubble: {
        flex: 1,
        minWidth: 80,
        borderRadius: 12,
        padding: 4,
        marginLeft: 6,
        marginBottom: 2,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { height: 1 }
    },
    bubbleAuthor: {
        flex: 1,
        width: '100%',
        minWidth: 80,
        padding: 4,
        borderRadius: 12,
        marginBottom: 2,
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
        paddingRight: 8,
        padding: 4
    },
    header: {
        borderBottomWidth: .5,
        borderBottomColor: '#2b515f',
        marginBottom: 4,
        paddingLeft: 12,
        paddingTop: 4,
        paddingBottom: 4
    },
    image: {
        height: 200,
        maxWidth: '100%',
        borderRadius: 12
    },
    caption: {
        flex: 1,
        minWidth: 80,
        borderRadius: 12,
        padding: 8,
        paddingTop: 10,
        paddingBottom: 6,
        marginLeft: 6,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { height: 1 }
    },
    captionAuthor: {
        flex: 1,
        minWidth: 80,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 12,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { height: 1 }
    },
})