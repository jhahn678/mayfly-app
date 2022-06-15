import { StyleSheet, Text, View } from 'react-native'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import FontelloIcon from '../../components/icons/Fontello'
import React from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'
import { useNavigation } from '@react-navigation/core'

const CatchesScreen = () => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
      <CatchesTabHeader/>
      <Text>Catches screen</Text>
      <FAB icon={<FontelloIcon name='fish' size={48}/>} 
        style={{ ...globalStyles.FAB, ...globalStyles.FABshadow }}
        onPress={() => navigation.navigate('NewCatch')}
        buttonStyle={{ paddingTop: 10, paddingLeft: 4 }}
      />
    </PrimaryBackground>
  )
}

export default CatchesScreen

const styles = StyleSheet.create({})