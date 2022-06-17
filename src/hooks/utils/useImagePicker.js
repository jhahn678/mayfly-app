import * as ImagePicker from 'expo-image-picker'
import { useState, useEffect } from 'react'


export const useImagePicker = () => {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await ImagePicker.getMediaLibraryPermissionsAsync()
            if(res.status === 'granted'){
                setHasPermission(true)
            }
        })()
    })

    const openImagePicker = async () => {
        if(!hasPermission){
            const res = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await ImagePicker.launchImageLibraryAsync())
    }

    return openImagePicker

}