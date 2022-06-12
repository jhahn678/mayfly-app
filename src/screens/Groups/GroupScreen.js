import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'

const GroupScreen = () => {
  return (
    <PrimaryBackground>
        <GroupsTabHeader/>
        <Text>Groups Screen</Text>
    </PrimaryBackground>
  )
}

export default GroupScreen

const styles = StyleSheet.create({})