import { Marker } from 'react-native-maps'
import { formatTimeMessage } from '../../utils/format-dates';

const CatchMarker = ({ data }) => {

    return (
        <Marker pinColor='#3ea9e2' title={data.title || 'untitled'} 
            description={`Caught ${formatTimeMessage(data.createdAt)}`}
            coordinate={{ 
                latitude: data.place?.location.coordinate[1] || data.location.coordinates[1],
                longitude: data.place?.location.coordinates[0] || data.location.coordinates[0]
            }}
        />
    )
}

export default CatchMarker;