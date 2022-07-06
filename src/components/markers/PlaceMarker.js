import { Marker } from 'react-native-maps'
import { formatTimeMessage } from '../../utils/format-dates'

const PlaceMarker = ({ data }) => {


    return(
        <Marker pinColor='#3ea9e2' title={data.name || 'untitled'} 
            description={`Saved ${formatTimeMessage(data.createdAt)}`}  
            coordinate={{ 
                latitude: data.location.coordinates[1],
                longitude: data.location.coordinates[0]
            }}
        />
    )
}

export default PlaceMarker;