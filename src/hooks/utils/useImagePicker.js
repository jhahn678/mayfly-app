import * as ImagePicker from 'expo-image-picker'
import { useState, useEffect } from 'react'


export const useImagePicker = () => {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await ImagePicker.getMediaLibraryPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    })

    const openImagePicker = async () => {
        if(!hasPermission){
            const res = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await ImagePicker.launchImageLibraryAsync({ base64: true, mediaTypes: 'Images' }))
    }

    return openImagePicker

}