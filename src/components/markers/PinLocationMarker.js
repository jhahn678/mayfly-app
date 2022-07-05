import { Marker } from 'react-native-maps'

const PinLocationMarker = ({ coordinates, setCoordinates }) => {




    return (
        <Marker draggable
            onDragEnd={({ nativeEvent }) => setCoordinates(nativeEvent.coordinate)}
            coordinate={{ 
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
        }}/> 
    )
}

export default PinLocationMarker;