import { Animated, Easing } from 'react-native'
import { useEffect, useRef, useState } from 'react'


const ExpandingView = ({ duration=100, delay=0, vertical=true, expand, initialValue=0, expandedValue, style, children }) => {

    const animation = useRef(new Animated.Value(initialValue)).current

    useEffect(() => {
        if(expand){
            Animated.timing(animation, {
                toValue: expandedValue,
                useNativeDriver: false,
                easing: Easing.ease,
                duration,
                delay
            }).start()
        }else{
            Animated.timing(animation, {
                toValue: initialValue,
                useNativeDriver: false,
                easing: Easing.ease,
                duration,
                delay
            }).start()
        }
    })

    return(
        <Animated.View style={{ ...style, height: animation }}>
            {children}
        </Animated.View>
    )
}

export default ExpandingView;