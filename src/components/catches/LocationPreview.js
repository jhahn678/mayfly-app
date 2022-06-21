import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const LocationPreview = ({ placeId, coordinates, snapshot, style, onRemove }) => {

    const [place] = useState({ name: 'The first place' })
    const [group] = useState({ name: 'Fishing amigos' })

    useEffect(() => {
        if(placeId){
            //query for place
            //setPlace
        }
    },[])


    return (
        <View style={{ ...styles.container, ...style}}>
            { snapshot ? (
                <Image source={{ uri: snapshot }} 
                    resizeMode='cover' 
                    style={styles.snapshot}
                /> ):(
                <Image source={{ uri: place?.avatar.url }} 
                    resizeMode='cover' 
                    style={styles.avatar}
                />
            )}
            { placeId ? 
                <View style={styles.details}>
                    <View>
                        <Text style={{ fontSize: 18 }}>{place.name}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row'}}>
                            <Text style={{ paddingRight: 4, color: '#0eaaa7' }}>in</Text> 
                            <Text style={{ fontStyle: 'italic', fontSize: 14}}>{group.name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Latitude: {coordinates.latitude}</Text>
                        <Text>Longitude: {coordinates.longitude}</Text>
                    </View>
                </View> :
                <View style={styles.details}>
                    <View>
                        <Text style={{ fontSize: 16, marginBottom: 4 }}>Pinned location</Text>
                        <Text style={{ fontStyle: 'italic' }}>Latitude: {coordinates.latitude}</Text>
                        <Text style={{ fontStyle: 'italic' }}>Longitude: {coordinates.longitude}</Text>
                    </View>
                </View>
            }
            <Icon name='close' size={24} style={styles.remove} onPress={() => onRemove()}/>
        </View>
    )
}

export default LocationPreview

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    snapshot: {
        height: '100%',
        width: '40%',
        borderRadius: 25,
        borderColor: '#0eaaa7',
        borderWidth: .5
    },
    details: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'space-between'
    },
    remove: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})