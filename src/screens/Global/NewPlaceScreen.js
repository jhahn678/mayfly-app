import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GlobalTabHeader from '../../components/headers/GlobalTabHeader'

const NewPlaceScreen = ({ navigation }) => {
  return (
    <PrimaryBackground>
      <GlobalTabHeader/>
      <Text>New Place Screen</Text>
    </PrimaryBackground>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({})