import { ImageBackground, StyleSheet} from 'react-native'
import image from '../../../assets/subtle-prism.png'

const PrismBackground = ({ children, style }) => {
  return (
    <ImageBackground 
        source={image} 
        resizeMode={'cover'} 
        style={{ ...styles.container, ...style}}
    >
        {children}
    </ImageBackground>
  )
}

export default PrismBackground;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})