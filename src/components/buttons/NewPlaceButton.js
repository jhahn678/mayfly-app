import { StyleSheet } from 'react-native'
import React from 'react'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'

const NewPlaceButton = ({ groupId }) => {

    const navigation = useNavigation()

    const handleOnPress = () => {
        navigation.navigate('NewPlace', { groupId })
    }

    return (
        <FAB size='small' buttonStyle={styles.button}
            icon={<Icon name='location-outline' size={18}/>}
            style={{...styles.FAB, ...globalStyles.FABshadow}}
            onPress={handleOnPress}
        />
    )
}

export default NewPlaceButton

const styles = StyleSheet.create({
    
})