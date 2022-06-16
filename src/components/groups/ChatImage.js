import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ChatImage = ({ image, clearImage }) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: image.uri }} style={styles.image} resizeMode='cover'/>
            <Icon name='remove-circle' size={24} style={styles.remove} onPress={clearImage}/>
        </View>
    )
}

export default ChatImage

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: 120,
        margin: 10,
        marginRight: 8,
        marginLeft: 8
    },
    image: {
        borderRadius: 20,
        height: '100%',
    },
    remove: {
        position: 'absolute',
        top: -6,
        right: -6,
        color: 'rgba(53, 52, 64, .9)'
    }
})