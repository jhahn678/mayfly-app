import { StyleSheet, Text, View, Image } from 'react-native'
import { BottomSheet } from '@rneui/themed'
import { useState, useEffect } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

const PlacesBottomModal = ({ isVisible, setIsVisible, data }) => {





    if(!data) return null

    return (
        
        <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}
            scrollViewProps={{ contentContainerStyle: styles.container }} 
            modalProps={{ animationType: 'slide'}}
        >
            <Text>{ data.name }</Text>
        </BottomSheet>
    )
}

export default PlacesBottomModal

const styles = StyleSheet.create({
    container: {
        height: 600,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
      }
})