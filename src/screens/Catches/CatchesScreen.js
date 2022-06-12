import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'

const CatchesScreen = () => {
  return (
    <PrimaryBackground>
      <CatchesTabHeader/>
      <Text>Catches screen</Text>
    </PrimaryBackground>
  )
}

export default CatchesScreen

const styles = StyleSheet.create({})