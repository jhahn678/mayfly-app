import { StyleSheet, Text, View, TextInput } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { useTextInputAutosize } from '../../hooks/utils/useTextInputAutosize'

const MessageBar = () => {

    const { onContentSizeChange, inputHeight } = useTextInputAutosize()

    const [messageInput, setMessageInput] = useState('')

    return (
        <View style={{ ...styles.container, height: inputHeight + 28 }}>
            <IonIcon name='camera-outline' size={32} color='#353440'/>
            <TextInput multiline={true}
                placeholder='Write message'
                placeholderTextColor='rgba(53, 52, 64, .3)'
                style={{...styles.input,height: inputHeight}}
                value={messageInput} onChangeText={setMessageInput}
                onContentSizeChange={(args) => onContentSizeChange(args)}
            />
            <IonIcon name='send-outline' size={24} style={{...styles.sendIcon }}/>
        </View>
    )
}

export default MessageBar

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        borderTopColor: 'rgba(0,0,0,.3)',
        borderTopWidth: .5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fefefe'
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
    }
})