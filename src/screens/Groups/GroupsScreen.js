import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'

const GroupsScreen = () => {
  return (
    <PrimaryBackground>
        <GroupsTabHeader/>
        <Text>Groups Screen</Text>
    </PrimaryBackground>
  )
}

export default GroupsScreen

const styles = StyleSheet.create({})