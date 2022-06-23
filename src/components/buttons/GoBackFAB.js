import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'

const GoBackFAB = ({ size='small', style, onPress }) => {

    const navigation = useNavigation()

    const handlePress = () => {
        onPress && onPress()
        navigation.goBack()
    }

    return (
        <FAB icon={<Icon name='return-up-back' size={18} color='rgb(120,120,120)'/>} 
            onPress={handlePress} size={size} color='rgb(220,220,220)'
            style={{ ...styles.button, ...style}}
        />
    )
}

export default GoBackFAB

const styles = StyleSheet.create({
    button: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .3,
        shadowRadius: 12,
        shadowOffset: { height: 1 },
    }
})