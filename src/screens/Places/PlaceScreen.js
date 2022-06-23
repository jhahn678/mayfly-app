import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Chip } from '@rneui/themed'
import AvatarChip from '../../components/chip/AvatarChip'
import GoBackFAB from '../../components/buttons/GoBackFAB'
import MapFAB from '../../components/buttons/MapFAB'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { makeFakePlaces } from '../../../test-data/groups'
import { formatCreatedAt } from '../../utils/format-dates'

const PlaceScreen = () => {

  const [place] = useState(makeFakePlaces(1)[0])
  
  const navigateToMap = useNavigateToMap()
  

  return (
    <>
    <GoBackFAB style={{ position: 'absolute', top: 48, left: 16, zIndex: 500}}/>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: place.avatar.url }} style={styles.avatar}resizeMode='cover'/>
        <MapFAB style={styles.mapButton} mapOptions={{ placeId: place._id}}/>
      </View>

      <Text numberOfLines={1} style={styles.name}>{place.name}</Text>

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginTop: 4}}>
        { place.publish_type === 'SHARED' ?
          <AvatarChip avatarUri={place.group.avatar.url}/> :
          <Chip title={place.publish_type} type='outline'  
            icon={place.publish_type === 'PRIVATE' ? 
                { name: 'shield', type: 'feather', size: 12 } : 
                { name: 'globe', type: 'entypo', size: 12 }
            } 
            containerStyle={{ width: 80, marginTop: 6 }} size='sm' disabled
            titleStyle={{ fontSize: 10 }} disabledTitleStyle={{ color: 'black'}}
            disabledStyle={{ borderColor: 'black'}}
          />
        }
        <Text style={styles.date}>{formatCreatedAt(place.createdAt)}</Text>
      </View>

      <Text style={styles.description}>
        <Text style={{ fontWeight: '300', fontStyle: 'italic'}}>Description: </Text>
        {place.description}
      </Text>

      <View style={styles.catches}>
        { place.catches.length === 0 ?
          <Text style={{ paddingVertical: 16, fontStyle: 'italic'}}>No catches logged here yet</Text> : 
          <>
            <Text style={{ paddingVertical: 8, fontStyle: 'italic'}}>{place.catches.length} catches logged</Text>
            { place.catches.map(c => (
              <View style={styles.catchListItem} key={c._id}>

              </View>
            ))}
          </>
        }
      </View>

    </ScrollView>
    </>
  )
}

export default PlaceScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    padding: 24,
    paddingTop: 64,
  },
  avatarContainer: {
    height: '40%',
    width: '100%',
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: '500',
    paddingTop: 16,
    maxWidth: '100%',
    paddingHorizontal: 12
  },
  date: { 
    paddingLeft: 16, 
    fontWeight: '300',
  },
  description: {
    fontSize: 16,
    marginTop: 24,
    width: '100%',
    paddingBottom: 24
  },
  mapButton: {
    position: 'absolute',
    right: -6,
    bottom: -6
  },
  catches: {
    borderTopColor: 'rgba(0,0,0,.2)',
    borderTopWidth: 1,
    width: '100%'
  },
  catchListItem: {
    height: 200
  }
})