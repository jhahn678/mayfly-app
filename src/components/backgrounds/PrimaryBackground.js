import { ImageBackground, StyleSheet} from 'react-native'
import image from '../../../assets/fish-background.png'

const PrimaryBackground = ({ children, style }) => {
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

export default PrimaryBackground;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})