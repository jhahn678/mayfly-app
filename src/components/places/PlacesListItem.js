import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { Chip } from '@rneui/themed'
import AvatarChip from '../chip/AvatarChip'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigateToMap } from '../../hooks/utils/useNavigateToMap'
import { useNavigation } from '@react-navigation/core'

const PlacesListItem = ({ item, selectedItems=null, setSelectedItems, style }) => {

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
        navigation.navigate('Place', { placeId: item._id })
    }

    return (
        <TouchableOpacity onPress={selectedItems && selectedItems.length > 0 ? onSelect : onPress } onLongPress={ selectedItems && onSelect}>
            <View style={{...styles.container, ...style }}>
                <View style={isSelected ? {...styles.imageContainer, borderColor: '#0eaaa7', borderWidth: 3} : styles.imageContainer}>
                    <Image source={{ uri: item.avatar.url }} resizeMode='cover' 
                        style={isSelected ? { ...styles.image, opacity: .4 } : styles.image}
                    />
                    {isSelected && <IonIcon name='checkmark-circle-outline' size={56} style={styles.checked}/>}
                </View>
                <View style={isSelected ? {...styles.right, ...styles.rightSelected} : styles.right}>
                    <View>
                        <Text style={item.name ? styles.name : styles.untitled} numberOfLines={1}>{item.name || 'untitled'}</Text>
                        <Text numberOfLines={1} style={{ fontWeight: '300', marginTop: 8}}>{item.locality}</Text>
                    </View>

                    <View>
                        { item.publish_type === 'SHARED' ? 
                            <AvatarChip avatarUri={item.group?.avatar.url} 
                                avatarSize={12} title={item.group?.name} 
                                style={{ marginTop: 4, maxWidth: '100%' }}
                            /> :
                            <Chip title={item.publish_type} type='outline'  
                                icon={item.publish_type === 'PRIVATE' ? 
                                    { name: 'shield', type: 'feather', size: 12, color: 'rgb(60,60,60)' } : 
                                    { name: 'globe', type: 'entypo', size: 12, color: 'rgb(60,60,60)' }
                                } 
                                containerStyle={{ width: 80, marginTop: 6, backgroundColor: '#EBF6F6' }} size='sm' disabled
                                titleStyle={{ fontSize: 10 }} disabledTitleStyle={{ color: 'rgb(60,60,60)'}}
                                disabledStyle={{ borderColor: 'rgb(120,120,120)'}}
                            />
                        }
                    </View>

                </View>
                <IonIcon size={16} name='map-outline' style={styles.showOnMap} 
                    onPress={() => navigateToMap({ placeId: item._id })}
                />
            </View>
        </TouchableOpacity>
    )
}

export default PlacesListItem

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
    rightSelected: {
        borderRightColor: '#0eaaa7',
        borderRightWidth: 6
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
        top: 10, 
        right: 10,
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
