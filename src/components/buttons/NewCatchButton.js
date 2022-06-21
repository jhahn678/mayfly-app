import { StyleSheet } from 'react-native'
import React from 'react'
import { FAB } from '@rneui/themed'
import FontelloIcon from '../../components/icons/Fontello'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'

const NewCatchButton = ({ groupId }) => {

    const navigation = useNavigation()

    const handleOnPress = () => {
        navigation.navigate('NewCatch', { groupId })
    }

    return (
        <FAB size='small' buttonStyle={styles.button}
            icon={<FontelloIcon name='fish' size={20}/>}
            style={{...styles.FAB, ...globalStyles.FABshadow}}
            onPress={handleOnPress}
        />
    )
}

export default NewCatchButton

const styles = StyleSheet.create({
    button: {
       
    },
    FAB: {

    }
})