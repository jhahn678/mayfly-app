import { StyleSheet } from 'react-native'
import React from 'react'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { globalStyles } from '../../styles/globalStyles'

const NewPlaceButton = ({ groupId }) => {

    const navigateToMap = useNavigateToMap()

    const handleOnPress = () => {
       navigateToMap({ groupId: groupId, snapshot: true, save: true, replace: true })
    }

    return (
        <FAB size='small' buttonStyle={styles.button}
            icon={<Icon name='location-outline' size={20} color='#fefefe'/>}
            style={{...styles.FAB, ...globalStyles.FABshadow}}
            onPress={handleOnPress}
        />
    )
}

export default NewPlaceButton

const styles = StyleSheet.create({
    
})