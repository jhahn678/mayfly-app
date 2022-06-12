import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'

const ViewCatchScreen = () => {
  return (
    <PrimaryBackground>
      <CatchesTabHeader/>
      <Text>View catch screen</Text>
    </PrimaryBackground>
  )
}

export default ViewCatchScreen

const styles = StyleSheet.create({})