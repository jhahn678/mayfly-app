import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap'
import FontelloIcon from '../../icons/Fontello'
import { useRoute } from '@react-navigation/core'
import PanelIconButton from './PanelIconButton'

const NewPlacePanelButton = () => {

    const navigateToMap = useNavigateToMap()
    const { params } = useRoute()

    const handlePress = () => {
       navigateToMap({ groupId: params?.groupId, snapshot: true, save: true, replace: true, showToggle: false })
    }

    return (
        <PanelIconButton label='Save a new location'
            onPress={handlePress} 
            icon={<FontelloIcon name='map' size={40} color='#fefefe'/>}
        />
    )
}

export default NewPlacePanelButton
