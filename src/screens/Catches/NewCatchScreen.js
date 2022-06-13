import { StyleSheet, Text } from 'react-native'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../components/headers/CreateHeader'

const NewCatchScreen = () => {

  return (
    <PrimaryBackground>
      <CreateHeader title='New Catch'/>
      <Text>Map screen</Text>
    </PrimaryBackground>
  )
}

export default NewCatchScreen;

const styles = StyleSheet.create({})