import { ImageBackground, StyleSheet, View} from 'react-native'
import image from '../../../assets/fish-background.png'

const PrimaryBackground = ({ children, style }) => {
  return (
    <View
        style={{ ...styles.container, ...style}}
    >
        {children}
    </View>
  )
}

export default PrimaryBackground;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        
    }
})