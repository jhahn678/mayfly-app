import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'

const NewGroupScreen = () => {
  return (
    <PrimaryBackground>
        <GroupsTabHeader/>
        <Text>New Group Screen</Text>
    </PrimaryBackground>
  )
}

export default NewGroupScreen

const styles = StyleSheet.create({})