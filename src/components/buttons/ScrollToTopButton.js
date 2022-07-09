import { StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import BaseFAB from './BaseFAB'
import IonIcon from 'react-native-vector-icons/Ionicons'

const ScrollToTopButton = ({ showScrollToTop, onPress, style, arrowUp=true }) => {

    const opacityRef = useRef(new Animated.Value(0)).current
    
    useEffect(() => {
        if(showScrollToTop){
            Animated.timing(opacityRef, {
            toValue: 1,
            duration:150,
            useNativeDriver: true
            }).start();
        }else{
            Animated.timing(opacityRef, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
            }).start();
        }
    },[showScrollToTop])

    return (
        <Animated.View style={{ opacity: opacityRef }}>
          <BaseFAB size={36}
            icon={<IonIcon name={arrowUp ? 'arrow-up' : 'arrow-down'} size={20} color='#fefefe'/>} 
            style={{...styles.scrollUp, ...style}} onPress={onPress}
          />
        </Animated.View>
    )
}

export default ScrollToTopButton

const styles = StyleSheet.create({
    scrollUp: {
        position: 'absolute',
        bottom: 92,
        alignSelf: 'center',
        color: '#3ea9e2',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOpacity: .3,
        shadowOffset: { height: 2 },
        elevation: 400
      },
})