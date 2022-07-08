import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView , Platform} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useTextInputAutosize } from '../../hooks/utils/useTextInputAutosize'
import { useNavigation } from '@react-navigation/core'
import { useImageContext } from '../../store/context/image'
import ChatImage from './ChatImage'
import Gradient from '../backgrounds/Gradient'
import { BottomSheet } from '@rneui/themed'
import ExpandingView from '../animations/ExpandingView'

const MessageBar = () => {

    const navigation = useNavigation()
    const [showOptions, setShowOptions] = useState(false)
    const { onContentSizeChange, inputHeight } = useTextInputAutosize()
    const [messageInput, setMessageInput] = useState('')
    const sendMessage = () => console.log(messageInput)

    const { chatImages, removeChatImage } = useImageContext()
    const handleCamera = () => navigation.navigate('Camera')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView horizontal>
            { chatImages && chatImages.map(i => <ChatImage key={i.uri} image={i} clearImage={() => removeChatImage(i.uri)}/>) }
            </ScrollView>

            <ExpandingView expand={showOptions} expandedValue={150} style={styles.optionsContainer}>

            </ExpandingView>

            <View style={{ ...styles.inputContainer, height: inputHeight > 150 ? 178 : inputHeight + 28 }}>
                {/* <IonIcon name='camera-outline' size={32} color='#353440' onPress={handleCamera}/> */}
                <TouchableOpacity onPress={() => setShowOptions(s => !s)}>
                    <Gradient style={styles.moreOptions}>
                        <AntIcon name={showOptions ? 'downcircleo' : 'pluscircleo'} size={37} color='#fefefe' />
                    </Gradient>
                </TouchableOpacity>

                <TextInput multiline={true}
                    placeholder='Write message'
                    placeholderTextColor='rgba(53, 52, 64, .3)'
                    style={{...styles.input, height: inputHeight, maxHeight: 150 }}
                    value={messageInput} onChangeText={setMessageInput}
                    onContentSizeChange={(args) => onContentSizeChange(args)}
                />

                <TouchableOpacity onPress={() => sendMessage()}>
                    <Gradient style={styles.sendIcon}>
                        <IonIcon name='send-outline' size={20} color='#fefefe'/>
                    </Gradient>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

export default MessageBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fefefe',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 8,
        elevation: 6,
        shadowOffset: { height: -1 }
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 16,
        width: '100%'
    },
    input: {
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 16,
        backgroundColor: '#ececec',
        borderRadius: 25,
        width: '70%',
        borderBottomWidth: 0,
        marginLeft: 8,
        marginRight: 8,
    },
    sendIcon: {
        backgroundColor: '#0eaaa7',
        color: '#fefefe',
        padding: 8,
        paddingRight: 7,
        paddingLeft: 10,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 8,
        elevation: 2,
        shadowOffset: { height: 2 },

    },
    image: {
        height: 132,
        width: 164,
        borderRadius: 20,
        margin: 10,
        marginRight: 8,
        marginLeft: 8
    },
    moreOptions: { 
        borderRadius: '50%', 
        height: 36, 
        width: 36, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    optionsContainer: {
        backgroundColor: '#fefefe', 
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    }
})