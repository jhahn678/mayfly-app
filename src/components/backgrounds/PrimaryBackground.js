import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const PrimaryBackground = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#136a8a','#032836']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ ...styles.container, ...style}}
    >
        {children}
    </LinearGradient>
  )
}

export default PrimaryBackground;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
