import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Gradient from '../../backgrounds/Gradient'
import React from 'react'

const PanelIconButton = ({ icon, label, onPress, style }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{...styles.container, ...style}}>
        <Gradient
          // colors={['#136a8a','#032836']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
            {icon}
        </Gradient>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    )
}

export default PanelIconButton

const styles = StyleSheet.create({
    gradient: {
        marginBottom: 4,
        borderRadius: 50,
        height: 76,
        width: 76,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      height: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: .2,
      shadowRadius: 2,
      shadowOffset: { height: 1 },
      elevation: 4,
      marginRight: 16
  },
  label: {
      fontSize: 12, 
      maxWidth: 76, 
      textAlign: 'center',
      color: '#032836'
  },
})