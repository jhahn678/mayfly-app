import { useState, useRef, useEffect } from 'react'
import { Animated } from 'react-native'



export const useToggleAnimation = ({ initialValue=1, animatedValue=0, duration, durationOn=150, durationOff=150 }) => {

    const ref = useRef(new Animated.Value(initialValue)).current
    const [toggledOn, setToggledOn] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if(!toggledOn) {
        //Toggle on
            Animated.timing(ref, { 
                toValue: animatedValue, 
                duration: duration ? duration : durationOn, 
                useNativeDriver: true
            }).start()
        }else{
        //Toggle off
            Animated.timing(ref, { 
                toValue: initialValue, 
                duration: duration ? duration : durationOff, 
                useNativeDriver: true
            }).start()
        }
    },[toggledOn])

    return {
        ref,
        toggledOn,
        setToggledOn
    }
}