import { StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import PanelIconButton from './PanelIconButton'
import FontelloIcon from '../../icons/Fontello'

const NewCatchPanelButton = () => {

    const navigation = useNavigation()

    return (
        <PanelIconButton label='Save a new catch'
            onPress={() => navigation.navigate('NewCatch')} 
            icon={<FontelloIcon name='fish-add' size={40} color='#fefefe'/>}
        />
    )
}

export default NewCatchPanelButton
