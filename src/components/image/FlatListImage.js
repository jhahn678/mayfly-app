import { StyleSheet, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const FlatListImage = ({ image, style, clearImage }) => {
  return (
    <View style={{...styles.container, ...style}}>
        <Image source={{ uri: image.uri }} resizeMode='cover' 
           style={styles.image}
        />
        { clearImage &&
            <Icon name='remove-circle' size={28} style={styles.remove} onPress={clearImage}/>
        }
    </View>
  )
}

export default FlatListImage

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    remove: {
        position: 'absolute',
        top: 8,
        right: 8,
        color: '#fefefe',
        backgroundColor: 'rgba(255,0,0,.6)',
        borderRadius: 16,
        paddingLeft: 2,
        overflow: 'hidden',
    }
})