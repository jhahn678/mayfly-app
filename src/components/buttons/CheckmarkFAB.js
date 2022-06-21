import { StyleSheet } from 'react-native'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'

const CheckmarkFAB = ({ size='large', style, onPress, disabled }) => {

    return (
        <FAB icon={<Icon name='checkmark' size={24} color='#fefefe'/>} 
            onPress={onPress} size={size} style={disabled ? {...style} : { ...styles.button, ...style}}
            disabledStyle={{ backgroundColor: 'rgb(220,220,220)', opacity: .7 }}
            disabled={disabled}
        />
    )
}

export default CheckmarkFAB

const styles = StyleSheet.create({
    button: {
        elevation: 12,
        shadowColor: '#000',
        shadowOpacity: .3,
        shadowRadius: 12,
        shadowOffset: { height: 2 }
    }
})