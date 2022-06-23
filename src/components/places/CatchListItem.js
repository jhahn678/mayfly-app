import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { formatCreatedAt } from '../../utils/format-dates'
import { useAuthContext } from '../../store/context/auth'


const CatchListItem = ({ data }) => {

    const { user } = useAuthContext()
    const navigation = useNavigation()


    return (
        <TouchableOpacity onPress={() => navigation.navigate('Catch', { catchId: data._id })}>
            <View style={styles.container}>
                <View>
                    { data.media.length > 0 ?
                        <Image source={{ uri: data.media[0].url }} resizeMode='cover' style={styles.image}/> :
                        <View style={styles.noImage}>
                            <Icon name='image-outline' size={48}/>
                        </View>
                    }
                </View>
                <View style={styles.details}>
                    <View>
                        <Text style={styles.user}>
                            { user._id !== data.user._id ? 
                                'You logged a catch' : 
                                `${data.user.details.username} logged a catch`
                            }
                        </Text>
                        <Text style={styles.title} numberOfLines={1}>{data.title || 'untitled'}</Text>
                    </View>
                    
                    <View>
                        { data.species && <Text style={styles.detail}>{data.species}</Text>}
                        { data.length && <Text style={styles.detail}>{`${data.length.value} ${data.length.unit.toLowerCase()}`}</Text>}
                        { data.weight && <Text style={styles.detail}>{`${data.weight.value} ${data.weight.unit.toLowerCase()}`}</Text>}
                    </View>
                    
                    <Text style={styles.createdAt}>{formatCreatedAt(data.createdAt)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CatchListItem

const styles = StyleSheet.create({
    container: {
        height: 132,
        width: '100%',
        borderColor: 'rgba(0,0,0,.2)',
        borderWidth: .5,
        borderRadius: 20,
        padding: 12,
        marginVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EBF6F6'
    },
    image: {
        height: '100%',
        width: 120,
        borderRadius: 16,
    },
    noImage: {
        height: '100%',
        width: 120,
        borderRadius: 16,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgb(220,220,220)'
    },
    details: {
        paddingLeft: 8,
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        maxWidth: 180
    },
    user: {
        fontSize: 12,
        fontWeight: '300',
        fontStyle: 'italic',
        marginBottom: 2
    },  
    createdAt: {
        fontSize: 10,
        fontWeight: '300'
    },
    detail: {
        fontWeight: '300',
        fontSize: 12
    }
})