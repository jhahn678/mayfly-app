import { useState, useEffect } from 'react'
import { getCurrentPositionAsync, getForegroundPermissionsAsync, requestForegroundPermissionsAsync } from 'expo-location'

export const useCurrentLocation = () => {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await getForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    },[])

    const getCurrentLocation = async () => {
        if(!hasPermission){
            const res = await requestForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await getCurrentPositionAsync())
    }
    
    return getCurrentLocation
}