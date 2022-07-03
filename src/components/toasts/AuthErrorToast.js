import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'

const AuthErrorToast = ({ visible, setVisible }) => {
    
    
    return (<>
        { visible && 
            <View style={styles.main}>
                <Text style={styles.text}>Invalid credentials</Text>
                <Icon name='close' size={20} 
                    style={styles.icon} 
                    onPress={() => setVisible(false)}
                    color='#0A3542'
                />
            </View>
        }
    </>)
}

export default AuthErrorToast

const styles = StyleSheet.create({
    main: {
        height: 64,
        width: '90%',
        position: 'absolute',
        top: 48,
        right: '5%',
        zIndex: 100000,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#AA0E11',
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 12,
        shadowOffset: { height: 6 },
        backgroundColor: '#fefefe',
        borderRadius: 12
    },
    text: {
        color: '#0A3542',
        fontWeight: '500',
        paddingLeft: 24,
        fontSize: 14
    },
    icon: {
        position: 'absolute',
        top: 4,
        right: 4
    }
})