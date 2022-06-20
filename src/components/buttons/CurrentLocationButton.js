import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { FAB } from '@rneui/themed'
import FontelloIcon from '../icons/Fontello'
import { globalStyles } from '../../styles/globalStyles'
import { useCurrentLocation } from '../../hooks/utils/useCurrentLocation'

const CurrentLocationButton = ({ style, iconSize=32, setLocation }) => {

    const getCurrentLocation = useCurrentLocation()

    const handleGetLocation = async () => {
        try{
            const res = await getCurrentLocation()
            setLocation(res.coords)
        }catch(err){
            console.error(err)
        }
    }

    return (
        <FAB icon={<FontelloIcon name='current-location' size={iconSize}/>} 
            style={{ ...styles.button, ...globalStyles.FABshadow, ...style }}
            onPress={handleGetLocation}
            buttonStyle={{ padding: 0 }}
        />
    )
}

export default CurrentLocationButton

const styles = StyleSheet.create({
    button: {
        position: 'absolute'
    }
})