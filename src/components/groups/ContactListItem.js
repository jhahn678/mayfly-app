import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContactListItem = () => {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  )
}

export default ContactListItem

const styles = StyleSheet.create({ 
    container: {
        height: 68,
        minWidth: '92%',
        display: 'flex',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12
    }
})