import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ChatImage = ({ image, clearImage, height=150 }) => {

    return (
        <View style={{...styles.container, height: height, width: (height*(image.width / image.height)) || height}}>
            <Image source={{ uri: image.uri }} style={styles.image} resizeMode='cover'/>
            <Icon name='remove-circle' size={24} style={styles.remove} onPress={clearImage}/>
        </View>
    )
}

export default ChatImage

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginRight: 8,
        marginLeft: 8,
        maxWidth: 300,
        minWidth: 100
    },
    image: {
        borderRadius: 20,
        height: '100%',
    },
    remove: {
        position: 'absolute',
        top: -6,
        right: -6,
        color: '#fefefe',
        backgroundColor: 'rgba(255,0,0,.3)',
        borderRadius: 13,
        paddingLeft: 2,
        overflow: 'hidden'
    }
})