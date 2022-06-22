import { StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import { FAB } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'

const ScrollToTopButton = ({ showScrollToTop, onPress }) => {

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
          <FAB size='small' buttonStyle={{ height: 36, width: 36 }}
            icon={<IonIcon name='arrow-up' size={16} color='#fefefe'/>} 
            style={{...styles.scrollUp }} onPress={onPress}
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