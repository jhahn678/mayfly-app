import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const NewCatchGradient = ({ children, style }) => {
  return (
    <LinearGradient
        colors={['rgba(255, 255, 255,.8)','rgba(255, 255, 255, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ ...styles.container, ...style}}
    >
        {children}
    </LinearGradient>
  )
}

export default NewCatchGradient

const styles = StyleSheet.create({
    container: {
        height: '85%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    }
})