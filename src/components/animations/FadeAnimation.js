import { Animated} from 'react-native'
import { useEffect, useRef } from 'react'


const FadeAnimation = ({ fadeOut, duration=500, delay=0, style, children }) => {

    const animation = useRef(new Animated.Value(fadeOut ? 1 : 0)).current

    useEffect(() => {
        Animated.timing(animation, { 
            toValue: fadeOut ? 0 : 1,
            duration: duration,
            delay: delay,
            useNativeDriver: true
        }).start()
    },[animation])

    return(
        <Animated.View style={{ ...style, opacity: animation }}>
            {children}
        </Animated.View>
    )
}

export default FadeAnimation;