import { useState, useEffect } from 'react'
import { isAvailableAsync, sendSMSAsync } from 'expo-sms'


export const useSendSMSInvite = () => {

    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        if(!isAvailable){
            (async () => {
                const result = await isAvailableAsync()
                setIsAvailable(result)
            })()
        }
    },[])

    const sendSMSInvite = async (phoneNumberString) => {
        await sendSMSAsync(phoneNumberString, "Here's an invite to join me on Mayfly!")
    }

    return {
        sendSMSInvite
    }
}