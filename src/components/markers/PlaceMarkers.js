import { Marker } from 'react-native-maps'
import { useAuthContext } from '../../store/context/auth';

const PlaceMarkers = ({ userData, groupData, userId, onPressPin }) => {

    const { user } = useAuthContext()

    return (<>
        { userData && userData.getUser.places.map(p => (
            <Marker key={p._id} pinColor='#3ea9e2' title={p.name || 'untitled'} 
                onPress={() => onPressPin({ placeId: p._id})}
                description={`Added by ${userId !== user._id ? userData.getUser.details.username : 'you'}`}  
                coordinate={{ 
                    latitude: p.location.coordinates[1],
                    longitude: p.location.coordinates[0]
                }}
            />
        ))}  
        { groupData && groupData.getGroup.places.map(p => (
            <Marker key={p._id} pinColor='#3ea9e2' title={p.name || 'untitled'} 
                description={`Added by ${p.user._id === user._id ? 'you' : p.user.details.username}`}  
                onPress={() => onPressPin({ placeId: p._id})}
                coordinate={{ 
                    latitude: p.location.coordinates[1],
                    longitude: p.location.coordinates[0]
                }}
            /> 
        ))}   
    </>)
}

export default PlaceMarkers;