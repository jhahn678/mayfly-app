import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon'

const GoogleLoginButton = ({ containerStyle, text, onClick, iconSize }) => {
  
    return (
        <TouchableOpacity style={{ ...styles.container, ...containerStyle}} onClick={onClick}>
            <GoogleIcon containerStyle={styles.icon} size={iconSize}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default GoogleLoginButton

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fefefe',
        color: '#0A3542',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 12,
        shadowOffset: { height: 6 }
    }
})