import { StyleSheet, View, Text } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Switch } from '@rneui/themed';
import CurrentLocationButton from '../components/buttons/CurrentLocationButton';
import { useCurrentLocation } from '../hooks/utils/useCurrentLocation';
import { useRoute, useNavigation } from '@react-navigation/core'
import GoBackFAB from '../components/buttons/GoBackFAB';
import CheckmarkFAB from '../components/buttons/CheckmarkFAB';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FadeAnimation from '../components/animations/FadeAnimation'
import { makeFakePlaces, makeFakeCatches } from '../../test-data/groups';

const MapScreen = () => {

    
    const [savedPlaces, setSavedPlaces] = useState([])
    const [catches, setCatches] = useState([])
    const [showCatches, setShowCatches] = useState(false)
    const [showPlaces, setShowPlaces] = useState(false)
    useEffect(() => {
        if(route.params?.places === true){
            setShowPlaces(true)
            setSavedPlaces(makeFakePlaces(10))
        }
        if(route.params?.catches === true){
            setShowCatches(true)
            setCatches(makeFakeCatches(20))
        }
    },[])


    const navigation = useNavigation()
    const route = useRoute()
    const mapRef = useRef()
    const getCurrentLocation = useCurrentLocation()

    const [viewInstructionBubble, setViewInstructionBubble] = useState(false)
    const [showDoneButton, setShowDoneButton] = useState(false)
    const [pinCoordinates, setPinCoordinates] = useState(null)
    const [focusedLocation, setFocusedLocation] = useState(null)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null) 
    const [zoom, setZoom] = useState(14) 
    

    //On map load we check route params for to see if map
    //should auto focus on current location
    const onMapReady = async () => {
        if(route.params?.currentLocation){
            const { coords } = await getCurrentLocation()
            const latlong = { latitude: coords.latitude, longitude: coords.longitude }
            mapRef.current.animateCamera({ center: latlong, zoom: 18 })
            setPinCoordinates(latlong)
        }
        if(route.params?.save && !route.params?.currentLocation){
            setViewInstructionBubble(true)
        }
        if(route.params?.save || route.params?.currentLocation || route.params?.selectPlace){
            setShowDoneButton(true)
        }
    } 

    const handleZoomIn = () => setZoom(z => z >= 19 ? z : z + 2)
    const handleZoomOut = () => setZoom(z => z <= 2 ? z : z - 2)

    useEffect(() => {
        mapRef.current.animateCamera({ zoom: zoom })
    },[zoom])   
      

    useEffect(() => {
        if(focusedLocation){
            mapRef.current.animateCamera({ 
                center: { 
                    latitude: focusedLocation.latitude, 
                    longitude: focusedLocation.longitude
                },
                zoom: 16,
            })
        }
    },[focusedLocation])


    const handleOnPressPin = ({ catchId, placeId }) => {
        if(route.params?.selectPlace){
            return setSelectedPlaceId(placeId)
        }
        if(placeId){
            navigation.navigate('Place', { placeId: placeId })
        }
        if(catchId){
            navigation.navigate('Catch', { catchId: catchId })
        }
    }


    const handleDone = async () => {
        const history = navigation.getState().routes
        const navigatedFrom = history[history.length - 2].name
        const params = { coordinates: pinCoordinates }
        if(route.params?.groupId){
            params.groupId = route.params.groupId
        }
        if(route.params?.selectPlace === true){
            params.placeId = selectedPlaceId;
        }
        if(route.params?.snapshot === true){
            const options = { format: 'jpg', width: 300, height: 300, quality: .5, result: 'base64' }
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
                pitchEnabled={false} onMapReady={onMapReady} showsUserLocation={true}
                onLongPress={({ nativeEvent }) => setPinCoordinates(nativeEvent.coordinate)}
            >
                { pinCoordinates && 
                    <Marker draggable
                    onDragEnd={({ nativeEvent }) => setPinCoordinates(nativeEvent.coordinate)}
                    coordinate={{ 
                        latitude: pinCoordinates.latitude,
                        longitude: pinCoordinates.longitude
                    }}/> 
                }
                { showPlaces && savedPlaces.map(sp => (
                    <Marker key={sp._id} pinColor='#3ea9e2'
                    title={sp.name || 'untitled'} 
                    description={`Added by ${sp.user.details.firstName}`} 
                    onPress={() => handleOnPressPin({ placeId: sp._id})}
                    coordinate={{ 
                        latitude: sp.location.coordinates[1],
                        longitude: sp.location.coordinates[0]
                    }}/>
                ))}
                { showCatches && catches.map(c => c.place && (
                    <Marker key={c._id} pinColor='#8AC926'
                        title={c.name || 'untitled'}
                        description={`Added by ${c.user.details.firstName}`}
                        onPress={() => handleOnPressPin({ catchId: c._id })}
                        coordinate={{
                            latitude: c.place.location.coordinates[1],
                            longitude: c.place.location.coordinates[0]
                        }}
                    />
                ))}
            </MapView>
            <View style={styles.header}>
                <GoBackFAB/>
                { showDoneButton && 
                    <CheckmarkFAB onPress={handleDone} 
                        disabled={
                            ((route.params?.save || route.params?.currentLocation) && !pinCoordinates) ||
                            (route.params?.selectPlace && !selectedPlaceId)
                        }
                    /> 
                }
            </View>
            <CurrentLocationButton style={styles.currentLocation} setLocation={setFocusedLocation}/>
            <View style={styles.zoom}>
                <FeatherIcon name='zoom-in' size={24} onPress={handleZoomIn}/>
                <View style={{ width: '100%', height: 1, backgroundColor: 'black'}}/>
                <FeatherIcon name='zoom-out' size={24} onPress={handleZoomOut}/>
            </View>
            { viewInstructionBubble && 
                <FadeAnimation style={styles.bottom} fadeOut delay={8000}>
                    <Text style={styles.bubble}>Press and hold to place a marker</Text>
                </FadeAnimation>
            }
            { route.params?.showToggle &&
                <View style={styles.toggleBox}>
                    <View style={{ alignItems: 'center' }}>
                        <Switch value={showCatches} onValueChange={() => setShowCatches(c => !c)}/>
                        <Text>Catches</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Switch value={showPlaces} onValueChange={() => setShowPlaces(p => !p)}/>
                        <Text>Places</Text>
                    </View>
                </View>
            }
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
        bottom: 48,
        zIndex: 100
    },
    zoom: {
        position: 'absolute',
        bottom: 40,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8,
        height: 100,
        borderRadius: 24,
        backgroundColor: 'rgba(220,220,220,.6)',
        zIndex: 100
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
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 120,
        fontSize: 12,
        backgroundColor: 'rgba(220,220,220,.6)',
        borderRadius: 20,
        overflow: 'hidden'
    },
    toggleBox: {
        position: 'absolute',
        right: 20,
        bottom: 132,
        height: 144,
        width: 64,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(220,220,220,.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})