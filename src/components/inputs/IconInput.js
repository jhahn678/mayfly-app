import { StyleSheet, View, TextInput, Text } from 'react-native'
import React from 'react'

export default function IconInput({ Icon, containerStyle, value, setValue, label, isError, error, isPassword }) {
  return (
    <View style={containerStyle}>
    <View style={{...styles.inputContainer, borderColor: isError && '#df2c0c' }}>
        <View style={{...styles.inputIcon, borderRightColor: isError && '#df2c0c'}}>
            {Icon}
        </View>
        <TextInput placeholder={label}
            placeholderTextColor='rgba(10, 53, 66, .4)' 
            value={value} 
            onChangeText={setValue} 
            style={styles.inputField}
            secureTextEntry={isPassword}
            selectionColor='#0A3542'
        />
    </View>
    { error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 254, 243, .3)',
        marginBottom: 6
      },
      inputIcon: {
        marginRight: 4,
        borderRightColor: 'rgba(0,0,0,.3)',
        borderRightWidth: 1,
        padding: 12
      }, 
      inputField: {
        color: '#0A3542',
        fontWeight: '400',
        fontSize: 20,
        width: '80%',
        padding: 6
      },
      errorMessage: {
        fontSize: 14,
        paddingLeft: 8,
        color: '#df2c0c'
      },
})