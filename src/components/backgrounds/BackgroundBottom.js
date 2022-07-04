import { ImageBackground, StyleSheet} from 'react-native'
import image from '../../../assets/background-bottom.jpg'

const BackgroundBottom = ({ children, style }) => {
  return (
    <ImageBackground
    source={image}
    style={{ ...styles.container, ...style}}
  >
      {children}
  </ImageBackground>
  )
}

export default BackgroundBottom;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#24002D'
    }
})