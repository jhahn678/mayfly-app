import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useTextInputAutosize } from '../../hooks/utils/useTextInputAutosize'
import { useNavigation } from '@react-navigation/core'
import { useImageContext } from '../../store/context/image'
import ChatImage from './ChatImage'

const MessageBar = () => {

    const navigation = useNavigation()

    const { onContentSizeChange, inputHeight } = useTextInputAutosize()
    const [messageInput, setMessageInput] = useState('')
    const sendMessage = () => console.log(messageInput)

    const { images, removeImage } = useImageContext()
    const handleCamera = () => navigation.navigate('Camera')

    return (
        <View style={styles.container}>
            { images && images.map(i => <ChatImage key={i.uri} image={i} clearImage={() => removeImage(i.uri)}/>) }
            <View style={{ ...styles.inputContainer, height: inputHeight + 28 }}>
                <IonIcon name='camera-outline' size={32} color='#353440' onPress={handleCamera}/>
                <TextInput multiline={true}
                    placeholder='Write message'
                    placeholderTextColor='rgba(53, 52, 64, .3)'
                    style={{...styles.input,height: inputHeight}}
                    value={messageInput} onChangeText={setMessageInput}
                    onContentSizeChange={(args) => onContentSizeChange(args)}
                />
                <TouchableOpacity onPress={() => sendMessage()}>
                    <IonIcon name='send-outline' size={24} style={{...styles.sendIcon }}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopColor: 'rgba(0,0,0,.3)',
        backgroundColor: 'rgba(254, 254, 254, .8)',
        borderTopWidth: .5,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fefefe',
    },
    input: {
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: 25,
        width: '70%',
        borderBottomWidth: 0,
        marginLeft: 8,
        marginRight: 8,
    },
    sendIcon: {
        backgroundColor: '#0eaaa7',
        color: '#fefefe',
        padding: 6,
        paddingLeft: 8,
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        height: 132,
        width: 164,
        borderRadius: 20,
        margin: 10,
        marginRight: 8,
        marginLeft: 8
    }
})