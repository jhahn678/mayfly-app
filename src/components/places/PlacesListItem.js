import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { Chip } from '@rneui/themed'
import { useNavigation } from '@react-navigation/core'
import AvatarChip from '../chip/AvatarChip'
import IonIcon from 'react-native-vector-icons/Ionicons'

const PlacesListItem = ({ item, selectedItems, setSelectedItems }) => {

    const navigation = useNavigation()
    
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        selectedItems.includes(item._id) ?
        setIsSelected(true) : setIsSelected(false)
    },[selectedItems])

    const onPress = () => {
        navigation.navigate('Place', { placeId: item._id })
    }

    const onSelect = () => {
        setSelectedItems(items => {
            if(items.includes(item._id)){
                return items.filter(i => i !== item._id)
            }else{
                return [...items, item._id]
            }
        })
    }



    return (
        <TouchableOpacity onPress={selectedItems.length > 0 ? onSelect : onPress} onLongPress={onSelect}>
            <View style={styles.container}>
                <View style={isSelected ? {...styles.imageContainer, borderColor: '#0eaaa7', borderWidth: 3} : styles.imageContainer}>
                    <Image source={{ uri: item.avatar.url }} resizeMode='cover' 
                        style={isSelected ? { ...styles.image, opacity: .4 } : styles.image}
                    />
                    {isSelected && <IonIcon name='checkmark-circle-outline' size={56} style={styles.checked}/>}
                </View>
                <View style={isSelected ? {...styles.right, ...styles.rightSelected} : styles.right}>
                    <View>
                        <Text style={item.name ? styles.name : styles.untitled} numberOfLines={1}>{item.name || 'untitled'}</Text>
                        { item.publish_type === 'SHARED' ? 
                            <AvatarChip avatarUri={item.group?.avatar.url} 
                                avatarSize={12} title={item.group?.name} 
                                style={{ marginTop: 4, maxWidth: '100%' }}
                            /> :
                            <Chip title={item.publish_type} type='outline' 
                                icon={item.publish_type === 'PRIVATE' ? 
                                    { name: 'shield', type: 'feather', size: 12 } : 
                                    { name: 'globe', type: 'entypo', size: 12 }
                                } 
                                containerStyle={{ width: 80, marginTop: 8 }} size='sm'
                                titleStyle={{ fontSize: 10 }}
                            />
                        }
                    </View>

                    <View>
                        <View style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'row'}}>
                            <Text style={{ fontWeight: '300', fontSize: 12}}>near </Text>
                            <Text>{item.locality}</Text>
                        </View>
                        <Text style={styles.catches}>
                            {`${item.catches.length} ${item.catches.length === 1 ? 'catch' : 'catches'}`}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PlacesListItem

const styles = StyleSheet.create({
    container: {
        height: 150,
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
        marginTop: 8
    }
})
