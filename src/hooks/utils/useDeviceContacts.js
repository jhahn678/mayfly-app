import { useState, useEffect } from 'react'
import { getPermissionsAsync, requestPermissionsAsync, getContactsAsync } from 'expo-contacts'


export const useDeviceContacts = () => {

    const [hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await getPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    },[])

    const getDeviceContacts = async (pageSize=0, pageOffset=0) => {
        if(!hasPermission){
            const res = await requestPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await getContactsAsync({
            fields: ['name', 'phoneNumbers', 'image'],
            pageSize: pageSize,
            pageOffset: pageOffset
        }))
    }


    return {
        getDeviceContacts
    }
}