import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { useRoute } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FontelloIcon from '../icons/Fontello'

const AddLocationPanel = ({ groupId=null, userId=null, numberOfSavedLocations=0, containerStyle }) => {

    const route = useRoute()
    const navigateToMap = useNavigateToMap()


    return (
        <View style={{...styles.addLocationContainer, ...containerStyle}}>

        { groupId && (
            <TouchableOpacity style={styles.locationOption} 
                onPress={() => navigateToMap({ groupId: groupId, selectPlace: true })}
            >
                <View style={styles.locationOptionIcon}>
                <IonIcon name='ios-bookmarks-outline' size={36} color='rgb(100,100,100)'/>
                </View>
                <Text style={{ fontSize: 12, maxWidth: 92, textAlign: 'center' }}>
                {numberOfSavedLocations} saved locations
                </Text>
            </TouchableOpacity> 

        )}
        { userId && (
            <TouchableOpacity style={styles.locationOption} 
                onPress={() => navigateToMap({ userId: userId, selectPlace: true })}
            >
                <View style={styles.locationOptionIcon}>
                <IonIcon name='ios-bookmarks-outline' size={36} color='rgb(100,100,100)'/>
                </View>
                <Text style={{ fontSize: 12, maxWidth: 92, textAlign: 'center' }}>
                {numberOfSavedLocations} saved locations
                </Text>
            </TouchableOpacity>
        )}

            <TouchableOpacity style={styles.locationOption} 
                onPress={() => navigateToMap({ save: true, replace: true, currentLocation: true, snapshot: true })}
            >
                <View style={styles.locationOptionIcon}>
                    <FontelloIcon name='map' size={40} color='rgb(100,100,100)'/>
                </View>
                <Text style={{ fontSize: 12, maxWidth: 100, textAlign: 'center' }}>Save a new location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationOption} 
                onPress={() => navigateToMap({ currentLocation: true, snapshot: true })}
            >
                <View style={styles.locationOptionIcon}>
                    <FontelloIcon name='pin-current-location' size={48} color='rgb(100,100,100)'/>
                </View>
                <Text style={{ fontSize: 12, maxWidth: 100, textAlign: 'center' }}>Add my current location</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddLocationPanel

const styles = StyleSheet.create({
  addLocationContainer: {
    width: '100%',
    height: 100,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  locationOption: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationOptionIcon: {
    marginBottom: 4,
    borderRadius: 50,
    height: 76,
    width: 76,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(230,230,230)',
    shadowColor: '#000',
    shadowOpacity: .1,
    shadowRadius: 12,
    shadowOffset: { height: 1 },
    elevation: 4,
  }
})