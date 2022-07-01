import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FacebookIcon from '../../icons/FacebookIcon'

const FacebookLoginButton = ({ containerStyle, text, onClick, iconSize }) => {

    return (
        <TouchableOpacity style={{ ...styles.container, ...containerStyle}} onClick={onClick}>
            <FacebookIcon containerStyle={styles.icon} size={iconSize}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default FacebookLoginButton

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
        shadowRadius: 8,
        elevation: 4,
        shadowOffset: { height: 4 }
    },
    button: {
        backgroundColor: 'none',
    }
})