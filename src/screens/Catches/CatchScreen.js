import { StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { Icon } from '@rneui/themed'
import GoBackFAB from '../../components/buttons/GoBackFAB'
import MapFAB from '../../components/buttons/MapFAB'
import { formatCreatedAt } from '../../utils/format-dates'
import { useAuthContext } from '../../store/context/auth'
import { useNavigation, useRoute } from '@react-navigation/core'
import { makeFakeCatches } from '../../../test-data/groups'

const CatchScreen = () => {
  
  const [data] = useState(makeFakeCatches(1)[0])
  const { width: screenWidth } = Dimensions.get('screen')
  const { user } = useAuthContext()
  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    if(route.params?.catchId){
      //fetch catchId
    }
  },[])

  const handleEdit = () => {
    navigation.navigate('NewCatch', { catchId: data._id })
  }

  
  return (
    <View>
      <GoBackFAB style={{ position: 'absolute', top: 48, left: 16, zIndex: 500}}/>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.avatarContainer}>
          <FlatList data={data.media}
            pagingEnabled={true} horizontal={true}
            keyExtractor={item => item.id}
            contentContainerStyle={{ height: '100%' }}
            renderItem={({ item }) => (
              <Image key={item.id} source={{ uri: item.url }} 
              style={{ height: '100%', width: (screenWidth*.9) }} resizeMode='cover'
              />
            )}
          />
          { data.place && (data.user._id === user._id || data.place.publish_type !== 'PRIVATE') &&
            <MapFAB style={styles.mapButton} mapOptions={{ placeId: data._id}}/>
          }
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 16 }}>
          { user._id === data.user._id && <Icon type='ionicon' name='pencil' raised size={12} onPress={handleEdit}/> }
          <Text numberOfLines={1} style={styles.name}>{data.title}</Text>
        </View>

        <View style={{ display: 'flex', alignItems: 'center', marginTop: 8, marginBottom: 24}}>
          { data.user._id !== user._id ?
            <Text style={{ marginBottom: 8 }}>Logged by @{data.user.details.username}</Text> :
            <Text style={{ marginBottom: 8 }}>Logged by you</Text>
          }
          <Text style={styles.date}>{formatCreatedAt(data.createdAt)}</Text>
        </View>


        { data.rig &&
          <Text style={{ ...styles.detail }}>
            <Text style={{ fontWeight: '300', fontStyle: 'italic'}}>Rig: </Text>
            {data.rig}
          </Text>
        }
        { data.species &&
          <Text style={{ ...styles.detail }}>
            <Text style={{ fontWeight: '300', fontStyle: 'italic'}}>Species: </Text>
            {data.species}
          </Text>
        }
        { data.length &&
          <Text style={styles.detail}>
            <Text style={{ fontWeight: '300', fontStyle: 'italic'}}>Length: </Text>
            {`${data.length.value} ${data.length.unit.toLowerCase()}`}
          </Text>
        }
        { data.weight &&
          <Text style={styles.detail}>
            <Text style={{ fontWeight: '300', fontStyle: 'italic'}}>Weight: </Text>
            {`${data.weight.value} ${data.weight.unit.toLowerCase()}`}
          </Text>
        }

      </ScrollView>
    </View>
  )
}

export default CatchScreen

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5%',
    paddingTop: 64
  },
  avatarContainer: {
    height: 350,
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
    maxWidth: '100%',
    paddingRight: 12,
  },
  edit:{
    padding: 4,
    borderRadius: 16,
    backgroundColor: 'rgb(220,220,220)'
  },  
  date: { 
    paddingLeft: 16, 
    fontWeight: '300',
  },
  detail: {
    fontSize: 16,
    marginTop: 8,
    width: '100%',
    paddingBottom: 8
  },
  mapButton: {
    position: 'absolute',
    right: -8,
    bottom: -8
  },
  catches: {
    borderTopColor: 'rgba(0,0,0,.2)',
    borderTopWidth: 1,
    width: '100%',
  },
  catchListItem: {
    height: 200
  },
  locationContainer: {
    height: 200, 
    width: '100%', 
    backgroundColor: 'yellow', 
    marginTop: 24
  }
})