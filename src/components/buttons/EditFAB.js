import { StyleSheet } from 'react-native'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'

const EditFAB = ({ size='small', style, onPress }) => {

    const handlePress = () => {
        onPress()
    }

    return (
        <FAB icon={<Icon name='pencil' size={18} color='rgb(120,120,120)'/>} 
            onPress={handlePress} size={size} color='rgb(220,220,220)'
            style={{ ...styles.button, ...style}}
        />
    )
}

export default EditFAB;

const styles = StyleSheet.create({
    button: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .3,
        shadowRadius: 12,
        shadowOffset: { height: 1 },
    }
})