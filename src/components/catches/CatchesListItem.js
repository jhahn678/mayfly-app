import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect} from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { formatCreatedAt } from '../../utils/format-dates'
import FontelloIcon from '../icons/Fontello'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { useNavigation } from '@react-navigation/core'

const CatchesListItem = ({ item, selectedItems=null, setSelectedItems, showCatch, style }) => {

    const navigateToMap = useNavigateToMap()
    const navigation = useNavigation()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if(selectedItems){
            selectedItems.includes(item._id) ?
            setIsSelected(true) : setIsSelected(false)
        }
    },[selectedItems])

    const onSelect = () => {
        setSelectedItems(items => {
            if(items.includes(item._id)){
                return items.filter(i => i !== item._id)
            }else{
                return [...items, item._id]
            }
        })
    }

    const onPress = () => {
        navigation.navigate('Catch', { catchId: item._id })
    }

    return (
        <TouchableOpacity onPress={ selectedItems && selectedItems.length > 0 ? onSelect : onPress } onLongPress={selectedItems && onSelect}>
            <View style={{...styles.container, ...style}}>
                <View style={isSelected ? {...styles.imageContainer, borderColor: '#0eaaa7', borderWidth: 3} : styles.imageContainer}>
                    <Image source={{ uri: item.media[0].url }} resizeMode='cover' 
                        style={isSelected ? { ...styles.image, opacity: .4 } : styles.image}
                    />
                    {isSelected && <IonIcon name='checkmark-circle-outline' size={56} style={styles.checked}/>}
                </View>
                <View style={isSelected ? {...styles.right, ...styles.rightSelected} : styles.right}>
                    <Text style={styles.title} numberOfLines={1}>{item.title || 'untitled'}</Text>
                    <View>
                        { item.species && <Text style={styles.detail}>{item.species}</Text>}
                        { item.length && <Text style={styles.detail}>{`${item.length.value} ${item.length.unit.toLowerCase()}`}</Text>}
                        { item.weight && <Text style={styles.detail}>{`${item.weight.value} ${item.weight.unit.toLowerCase()}`}</Text>}
                    </View>
                    <Text style={styles.createdAt}>{formatCreatedAt(item.createdAt)}</Text>
                </View>
                { item.place &&
                    <FontelloIcon size={16} name='location' 
                        style={styles.taggedLocation} 
                        onPress={() => navigateToMap({ 
                            catches: true, 
                            places: false, 
                            placeId: item.place._id 
                        })}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

export default CatchesListItem

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderBottomColor: 'rgba(53, 52, 64, .3)',
        borderBottomWidth: .3,
        display: 'flex',
        flexDirection: 'row',
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
    checked: {
       color: '#0eaaa7' 
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
    rightSelected: {
        borderRightColor: '#0eaaa7',
        borderRightWidth: 6
    },
    title: {
        maxWidth: 180
    },
    detail: {
        fontWeight: '300',
        fontSize: 12,
        display: 'flex',
        justifyContent: 'space-between'
    },
    createdAt: {
        fontSize: 10,
        fontWeight: '300'
    },
    taggedLocation: {
        position: 'absolute',
        right: 12,
        bottom: 12
    }
})