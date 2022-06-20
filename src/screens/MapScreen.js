import { StyleSheet, View } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CurrentLocationButton from '../components/buttons/CurrentLocationButton';
import { useCurrentLocation } from '../hooks/utils/useCurrentLocation';
import { useRoute, useNavigation } from '@react-navigation/core'
import GoBackFAB from '../components/buttons/GoBackFAB';
import CheckmarkFAB from '../components/buttons/CheckmarkFAB';
import FeatherIcon from 'react-native-vector-icons/Feather'

const MapScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const mapRef = useRef()
    const [pinCoordinates, setPinCoordinates] = useState(null)
    const getCurrentLocation = useCurrentLocation()

    //On map load we check route params for to see if map
    //should auto focus on current location
    const onMapReady = async () => {
        if(route.params?.currentLocation){
            const { coords } = await getCurrentLocation()
            const latlong = { latitude: coords.latitude, longitude: coords.longitude }
            mapRef.current.animateCamera({ center: latlong, zoom: 18 })
            setPinCoordinates(latlong)
        }
    } 



    const [zoom, setZoom] = useState(8)
    const handleZoomIn = () => setZoom(z => z >= 19 ? z : z + 2)
    const handleZoomOut = () => setZoom(z => z <= 2 ? z : z - 2)

    useEffect(() => {
        mapRef.current.animateCamera({ zoom: zoom })
    },[zoom])   
    
    

    const [focusedLocation, setFocusedLocation] = useState(null)    

    useEffect(() => {
        if(focusedLocation){
            mapRef.current.animateCamera({ 
                center: { 
                    latitude: focusedLocation.latitude, 
                    longitude: focusedLocation.longitude
                },
                zoom: 18
            })
            setZoom(18)
        }
    },[focusedLocation])



    const handleDone = async () => {
        const history = navigation.getState().routes
        const navigatedFrom = history[history.length - 2].name
        const params = { coordinates: pinCoordinates }
        if(route.params?.snapshot === true){
            const options = { format: 'jpg' }
            const res = await mapRef.current.takeSnapshot(options)
            params.image = res;
        }
        //Check if params indicate we are saving this location and/or replacing route
        if(route.params?.save === true && route.params?.replace === true){
            navigation.replace('NewPlace', params)
        }else if(route.params?.save === true){
            navigation.navigate('NewPlace', params)
        }else if(route.params?.replace === true){
            navigation.replace(navigatedFrom, params)
        }else{
            navigation.navigate(navigatedFrom, params)
        }
    }



    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} ref={mapRef} 
                pitchEnabled={false} onMapReady={onMapReady}
            >
                {pinCoordinates && 
                    <Marker draggable
                    onDragEnd={({ nativeEvent }) => setPinCoordinates(nativeEvent.coordinate)}
                    coordinate={{ 
                        latitude: pinCoordinates.latitude, 
                        longitude: pinCoordinates.longitude
                    }}/> 
                }
            </MapView>
            <View style={styles.header}>
                <GoBackFAB/>
                <CheckmarkFAB onPress={handleDone}/>
            </View>
            <CurrentLocationButton style={styles.currentLocation} setLocation={setFocusedLocation}/>
            <View style={styles.zoom}>
                <FeatherIcon name='zoom-out' size={24} onPress={handleZoomOut}/>
                <View style={{ height: '100%', width: 1, backgroundColor: 'black'}}/>
                <FeatherIcon name='zoom-in' size={24} onPress={handleZoomIn}/>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    map: {
        height: '100%',
        width: '100%'
    },
    currentLocation: {
        right: 24,
        bottom: 48
    },
    zoom: {
        position: 'absolute',
        bottom: 48,
        left: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8,
        width: 100,
        borderRadius: 24,
        backgroundColor: 'rgba(220,220,220,.8)'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20
    }
})