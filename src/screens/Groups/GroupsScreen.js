import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GroupsTabHeader from '../../components/headers/GroupsTabHeader'
import GroupListItem from '../../components/groups/GroupListItem'
import { fakeGroups } from '../../../test-data/groups'

const GroupsScreen = () => {

  const [selectedItems, setSelectedItems] = useState([])

  return (
    <PrimaryBackground>
        <GroupsTabHeader selectedItems={selectedItems}/>
        <FlatList
          data={fakeGroups}
          renderItem={({ item }) => (
            <GroupListItem 
              item={item} 
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          )}
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
    paddingBottom: 100,
    display: 'flex',
    alignItems: 'center'
  }
})