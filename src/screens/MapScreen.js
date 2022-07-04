import { StyleSheet, View, Text } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CurrentLocationButton from '../components/buttons/CurrentLocationButton';
import { useCurrentLocation } from '../hooks/utils/useCurrentLocation';
import { useAuthContext } from '../store/context/auth';
import { useLazyGetUserPlacesQuery } from '../hooks/queries/getUserPlaces'
import { useLazyGetUserCatchesQuery } from '../hooks/queries/getUserCatches';
import { useLazyGetGroupPlacesQuery } from '../hooks/queries/getGroupPlaces'
import { useLazyGetGroupCatchesQuery } from '../hooks/queries/getGroupCatches'
import { useRoute, useNavigation } from '@react-navigation/core'
import GoBackFAB from '../components/buttons/GoBackFAB';
import CheckmarkFAB from '../components/buttons/CheckmarkFAB';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MapToggleBox from '../components/buttons/MapToggleBox';

const MapScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const mapRef = useRef()
    const { user } = useAuthContext()
    const [getUserCatches, { data: userCatches, error: userCatchesError, loading: userCatchesLoading,  }] = useLazyGetUserCatchesQuery()
    const [getUserPlaces, { data: userPlaces, error: userPlacesError, loading: userPlacesLoading }] = useLazyGetUserPlacesQuery()
    const [getGroupCatches, { data: groupCatches, error: groupCatchesError, loading: groupCatchesLoading }] = useLazyGetGroupCatchesQuery()
    const [getGroupPlaces, { data: groupPlaces, error: groupPlacesError, loading: groupPlacesLoading }] = useLazyGetGroupPlacesQuery()
    const [showCatches, setShowCatches] = useState(false)
    const [showPlaces, setShowPlaces] = useState(false)
    const getCurrentLocation = useCurrentLocation()



    useEffect(() => {
        if(route.params?.groupId){
            getGroupCatches({ variables: { userId: route.params.groupId }})
            getGroupPlaces({ variables: { userId: route.params.groupId }})
        }
        else if(route.params?.userId){
            getUserCatches({ variables: { userId: route.params.userId }})
            getUserPlaces({ variables: { userId: route.params.userId }})
        }else{
            getUserCatches({ variables: { userId: user._id }})
            getUserPlaces({ variables: { userId: user._id }})
        }
        route.params?.places === true ? setShowPlaces(true) : setShowPlaces(false)
        route.params?.catches === true ? setShowCatches(true) : setShowCatches(false)
    },[])

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
        //need focused location to start on place one if no current location
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
                { showPlaces && 
                    (route.params?.groupId ? 
                        (groupPlaces && groupPlaces.map(p => (
                            <Marker key={p._id} pinColor='#3ea9e2'
                            title={p.name || 'untitled'} 
                            description={`Added by ${route.params?.userId ? userPlaces.getUser.details.username : 'you'}`}  
                            onPress={() => handleOnPressPin({ placeId: p._id})}
                            coordinate={{ 
                                latitude: p.location.coordinates[1],
                                longitude: p.location.coordinates[0]
                            }}/>
                        ))):
                        (userPlaces && userPlaces?.getUser?.places.map(p => (
                            <Marker key={p._id} pinColor='#3ea9e2' title={p.name || 'untitled'} 
                            description={`Added by ${route.params?.userId ? userPlaces.getUser.details.username : 'you'}`} 
                            onPress={() => handleOnPressPin({ placeId: p._id})}
                            coordinate={{ 
                                latitude: p.location.coordinates[1],
                                longitude: p.location.coordinates[0]
                            }}/>
                        )))
                    )
                }
                { showCatches && 
                    (route.params?.groupId ? 
                        (groupCatches && groupCatches.map(c => (
                            <Marker key={c._id} pinColor='#3ea9e2' title={c.name || 'untitled'} 
                            description={`Added by ${route.params?.userId ? userPlaces.getUser.details.username : 'you'}`}  
                            onPress={() => handleOnPressPin({ placeId: c._id})}
                            coordinate={{ 
                                latitude: c.location.coordinates[1],
                                longitude: c.location.coordinates[0]
                            }}/>
                        ))):
                        (userCatches && userCatches?.getUser?.catches.map(c => (
                            <Marker key={c._id} pinColor='#3ea9e2' title={c.name || 'untitled'} 
                            description={`Added by ${route.params?.userId ? userPlaces.getUser.details.username : 'you'}`}  
                            onPress={c.place ? () => handleOnPressPin({ placeId: c.place._id}) : null}
                            coordinate={{ 
                                latitude: c.place?.location.coordinate[1] || c.location.coordinates[1],
                                longitude: c.place?.location.coordinates[0] || c.location.coordinates[0]
                            }}/>
                        ))) 
                    )
                }

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
            <CurrentLocationButton style={styles.currentLocation} setLocation={setFocusedLocation} mapRef={mapRef}/>
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
            
            <MapToggleBox showCatches={showCatches} setShowCatches={setShowCatches}
                showPlaces={showPlaces} setShowPlaces={setShowPlaces}
            />
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




