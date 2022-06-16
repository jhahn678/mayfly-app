import { StyleSheet } from 'react-native'
import React from 'react'
import { FAB } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'

const ShareImageButton = ({ groupId }) => {

    const navigation = useNavigation()

    const handleOnPress = () => {
        // navigation.navigate()
    }

    return (
        <FAB size='small' buttonStyle={styles.button}
            icon={<Icon name='images-outline' size={18}/>}
            style={{...styles.FAB, ...globalStyles.FABshadow}}
            onPress={handleOnPress}
        />
    )
}

export default ShareImageButton

const styles = StyleSheet.create({
    button: {
        
    }
})