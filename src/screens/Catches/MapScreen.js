import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'

const MapScreen = () => {
    return (
      <PrimaryBackground>
        <CatchesTabHeader/>
        <Text>Map screen</Text>
      </PrimaryBackground>
    )
}

export default MapScreen

const styles = StyleSheet.create({})