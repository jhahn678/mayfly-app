import { Marker } from 'react-native-maps'
import { useAuthContext } from '../../store/context/auth'

const CatchMarkers = ({ userData, groupData, userId, onPressPin }) => {

    const { user } = useAuthContext(0)

    return (<>
        { groupData && groupData.getGroup.catches.map(c => (
            <Marker key={c._id} pinColor='#3ea9e2' title={c.name || 'untitled'} 
                description={`Added by ${c.user._id !== user._id ? groupData.getUser.details.username : 'you'}`}  
                onPress={() => onPressPin({ catchId: c._id})}
                coordinate={{ 
                    latitude: c.place?.location.coordinate[1] || c.location.coordinates[1],
                    longitude: c.place?.location.coordinates[0] || c.location.coordinates[0]
                }}
            />
        ))}
        { userData && userData.getUser.catches.map(c => (
            <Marker key={c._id} pinColor='#3ea9e2' title={c.name || 'untitled'} 
                description={`Added by ${userId !== user._id ? userData.getUser.details.username : 'you'}`}  
                onPress={() => onPressPin({ catchId: c._id })}
                coordinate={{ 
                    latitude: c.place?.location.coordinate[1] || c.location.coordinates[1],
                    longitude: c.place?.location.coordinates[0] || c.location.coordinates[0]
                }}
            />
        ))}
    </>)
}

export default CatchMarkers;
