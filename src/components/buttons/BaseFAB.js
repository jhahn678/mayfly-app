import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FAB } from '@rneui/themed'
import React from 'react'

const BaseFAB = ({ onPress, icon, style }) => {
    return (
        <FAB onPress={onPress}  
            icon={icon} style={{...styles.fab, ...style}}
            ViewComponent={({ children }) => (
                <LinearGradient style={styles.view}
                    colors={['#06beb6','#48b1bf']} 
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 1 }}
                >{children}
                </LinearGradient>
            )}
        />
    )
}

export default BaseFAB

const styles = StyleSheet.create({
    view: {
        height: 56,
        width: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        elevation: 12,
        shadowColor: 'black',
        shadowOffset: { height: 6 },
        shadowOpacity: .4,
        shadowRadius: 4
    }
})