import { StyleSheet, Text, View, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { Chip, Icon } from '@rneui/themed'
import BaseFAB from '../../components/buttons/BaseFAB'
import AvatarChip from '../../components/chip/AvatarChip'
import GoBackFAB from '../../components/buttons/GoBackFAB'
import MapFAB from '../../components/buttons/MapFAB'
import EditFAB from '../../components/buttons/EditFAB'
import { makeFakePlaces } from '../../../test-data/groups'
import { formatCreatedAt } from '../../utils/format-dates'
import CatchListItem from '../../components/places/CatchListItem'
import { useAuthContext } from '../../store/context/auth'
import { useNavigation, useRoute } from '@react-navigation/core'
import FontelloIcon from '../../components/icons/Fontello'

const PlaceScreen = () => {

  const { user } = useAuthContext()
  const navigation = useNavigation()
  const route = useRoute()
  const [place] = useState(makeFakePlaces(1)[0])
  const { width: screenWidth } = Dimensions.get('window')

  useEffect(() => {
    if(route.params?.placeId){
      //fetch place
    }
  },[route])

  const handleEdit = () => {
    navigation.navigate('NewPlace', { placeId: place._id })
  }
  

  return (
    <View>
      <GoBackFAB style={{ position: 'absolute', top: 48, left: 16, zIndex: 500}}/>
      { user._id === place.user._id &&
        <EditFAB style={{ position: 'absolute', top: 48, right: 16, zIndex: 500}} onPress={handleEdit}/> 
      }
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          { place.media.length === 0 ?
            <Image source={{ uri: place.avatar.url }} style={styles.image} resizeMode='cover'/> :
            <FlatList horizontal={true} data={place.media} style={styles.imageContainer}
              renderItem={({ item }) => (
                <Image source={{ uri: item.url }} style={{ ...styles.image, width: (screenWidth - 48)}}/>
              )}
              pagingEnabled={true}
              keyExtractor={item => item.url}
            />
          }
          <MapFAB style={styles.mapButton} mapOptions={{ placeId: place._id}}/>
          <BaseFAB icon={<FontelloIcon name='fish' size={28} color='#fefefe'/>} 
            style={styles.newCatch} onPress={() => navigation.navigate('NewCatch')}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 16 }}>
          { user._id === place._id && <Icon type='ionicon' name='pencil' raised size={12} onPress={handleEdit}/> }
          <Text numberOfLines={1} style={styles.name}>{place.name}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginTop: 4}}>
          { place.publish_type === 'SHARED' ?
            <AvatarChip avatarUri={place.group.avatar.url}/> :
            <Chip title={place.publish_type} type='outline'  
              icon={place.publish_type === 'PRIVATE' ? 
                  { name: 'shield', type: 'feather', size: 12 } : 
                  { name: 'globe', type: 'entypo', size: 12 }
              } 
              containerStyle={{ width: 80, marginTop: 6, backgroundColor: '#EBF6F6' }} size='sm' disabled
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
              <Text style={{ paddingVertical: 12, fontStyle: 'italic'}}>{place.catches.length} catches logged</Text>
              { place.catches.map(c => <CatchListItem key={c._id} data={c}/>)}
            </>
          }
        </View>

      </ScrollView>
    </View>
  )
}

export default PlaceScreen;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 24,
    paddingTop: 64
  },
  imageContainer: {
    height: 350,
    width: '100%',
    borderRadius: 30,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 28,
    fontWeight: '500',
    maxWidth: '100%',
    paddingRight: 12,
  },
  edit: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: 'rgb(220,220,220)'
  },  
  newCatch: { 
    position: 'absolute', 
    right: -8, 
    bottom: 58 
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
    right: -8,
    bottom: -8
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