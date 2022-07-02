import { StyleSheet, View, TextInput, Text } from 'react-native'
import React from 'react'

export default function IconInput({ Icon, containerStyle, value, setValue, label, showErrors=true, isError, error, isPassword }) {
  return (
    <View style={containerStyle}>
    <View style={isError ? styles.inputContainerError : styles.inputContainer}>
        <View style={{
          ...styles.inputIcon, 
          borderRightColor: isError ? '#AA0E11' : 'rgb(220,220,220)' }}>
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
  { showErrors && <Text style={styles.errorMessage}>{error}</Text> }
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: '#fefefe',
      marginBottom: 6,
      shadowColor: 'black',
      shadowOpacity: .3,
      shadowRadius: 6,
      elevation: 4,
      shadowOffset: { height: 6 }
    },
    inputContainerError: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: '#fefefe',
      marginBottom: 6,
      borderColor: '#AA0E11',
      borderWidth: 1,
      shadowColor: 'black',
      shadowOpacity: .3,
      shadowRadius: 8,
      elevation: 4,
      shadowOffset: { height: 4 }
    },
    inputIcon: {
      marginRight: 4,
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
      height: 14,
      fontSize: 14,
      fontWeight: '500',
      paddingLeft: 8,
      color: '#AA0E11'
    },
})