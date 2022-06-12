import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GlobalTabHeader from '../../components/headers/GlobalTabHeader'

const MapScreen = ({ navigation }) => {

  const onIconPress = () => {
    navigation.navigate('GlobalFeed')
  }

  return (
    <PrimaryBackground>
      <GlobalTabHeader onIconPress={onIconPress}/>
      <Text>MapScreen</Text>
    </PrimaryBackground>
  )
}

export default MapScreen

const styles = StyleSheet.create({})