import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'

export default function IconInput({ Icon, containerStyle, value, setValue, label }) {
  return (
    <View style={{...styles.inputContainer, ...containerStyle}}>
        <View style={styles.inputIcon}>
            {Icon}
        </View>
        <TextInput placeholder={label}
            placeholderTextColor='rgba(10, 53, 66, .4)' 
            value={value} 
            onChangeText={setValue} 
            style={styles.inputField}
        />
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
      },
      inputIcon: {
        marginRight: 4,
        borderRightColor: 'rgba(0,0,0,.3)',
        borderRightWidth: 1,
        padding: 12
      }, 
      inputField: {
        color: '#0A3542',
        fontWeight: '500',
        fontSize: 20,
        width: '80%',
        padding: 6
      }
})