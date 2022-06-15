import { StyleSheet, FlatList } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'
import GroupListItem from '../../components/groups/GroupListItem'
import { fakeGroups } from '../../../test-data/groups'


const GroupsScreen = () => {
  return (
    <PrimaryBackground>
        <GroupsTabHeader/>
        <FlatList
          data={fakeGroups}
          renderItem={({ item }) => <GroupListItem item={item}/>}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
    </PrimaryBackground>
  )
}

export default GroupsScreen

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 100
  }
})