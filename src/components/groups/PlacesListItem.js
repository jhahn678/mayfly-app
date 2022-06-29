import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import AvatarChip from '../chip/AvatarChip'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { useNavigation } from '@react-navigation/core'


const PlacesListItem = ({ item }) => {

    const navigation = useNavigation()
    const navigateToMap = useNavigateToMap()

    return(
        <TouchableOpacity onPress={() => navigation.navigate('Place', { placeId: item._id })} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.avatar.url }} resizeMode='cover' 
                        style={styles.image}
                    />
                </View>
                <View style={styles.right}>
                    <View>
                        <Text style={item.name ? styles.name : styles.untitled} numberOfLines={1}>
                            {item.name || 'untitled'}
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: 12}}>posted by {item.user.details.firstName}</Text>
                    </View>
                    <Text numberOfLines={1} style={{ fontWeight: '300', fontSize: 12 }}>{item.locality}</Text>
                </View>
                <IonIcon size={16} name='map-outline' style={styles.showOnMap} 
                    onPress={() => navigateToMap({ placeId: item._id })}
                />
            </View>
        </TouchableOpacity>
    )
}

export default PlacesListItem;

const styles = StyleSheet.create({
    container: {
        height: 132,
        width: '100%',
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: .5,
        borderRadius: 20,
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fefefe'
    },
    imageContainer: {
        width: '40%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 22,
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        position: 'absolute',
    },
    right: {
        width: '60%',
        height: '100%',
        paddingLeft: 12,
        paddingVertical: 4,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
    },
    untitled: {
        fontSize: 16,
        fontStyle: 'italic',
        color: 'rgb(180,180,180)'
    },
    catches: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 4
    },
    showOnMap: {
        position: 'absolute', 
        top: 8, 
        right: 8,
        backgroundColor: '#EBF6F6',
        padding: 6,
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { height: 1},
        shadowRadius: 2,
        shadowOpacity: .1
    }
})
