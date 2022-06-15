import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupHeader from '../../components/headers/GroupHeader'

const GroupScreen = () => {
  return (
    <PrimaryBackground>
      <GroupHeader/>
        <Text style={{ fontSize: 36}}>GROUP SCREEN</Text>
    </PrimaryBackground>
  )
}

export default GroupScreen

const styles = StyleSheet.create({})