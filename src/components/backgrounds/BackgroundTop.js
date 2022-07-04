import { ImageBackground, StyleSheet} from 'react-native'
import image from '../../../assets/background-top.jpg'

const BackgroundTop = ({ children, style }) => {
  return (
    <ImageBackground
    source={image}
    style={{ ...styles.container, ...style}}
  >
      {children}
  </ImageBackground>
  )
}

export default BackgroundTop;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#24002D'
    }
})