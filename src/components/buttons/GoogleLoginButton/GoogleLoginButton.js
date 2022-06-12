import { StyleSheet, Text } from 'react-native'
import { Button } from "@rneui/themed";
import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon'

const GoogleLoginButton = ({ containerStyle, text, onClick, iconSize }) => {
  
    return (
        <Button style={{ ...styles.container, ...containerStyle}} 
            buttonStyle={styles.button}
            onClick={onClick}
        >
            <GoogleIcon containerStyle={styles.icon} size={iconSize}/>
            <Text style={styles.text}>{text}</Text>
        </Button>
    )
}

export default GoogleLoginButton

const styles = StyleSheet.create({
    container: {
        width: 300,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 254, 243, .3)',
        color: '#0A3542',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'none'
    }
})