import { ImageBackground, StyleSheet} from 'react-native'
import image from '../../../assets/paper-river-cutout.png'

const AuthBackground = ({ children, style }) => {
  return (
    <ImageBackground
    source={image}
    style={{ ...styles.container, ...style}}
  >
      {children}
  </ImageBackground>
  )
}

export default AuthBackground;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#24002D'
    }
})