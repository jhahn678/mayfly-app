import { FlatList, StyleSheet, Text, View } from 'react-native'
import { BottomSheet, Input } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useState, useRef } from 'react'
import NewContactListItem from './NewContactListItem'
import { makeFakeContacts } from '../../../test-data/groups'

const NewContactBottomSheet = ({ isVisible, setIsVisible }) => {
    
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState(makeFakeContacts(20))
    const [selectedUser, setSelectedUser] = useState(null)
    const flatListRef = useRef()

    const handleSearch = async (v) => {
        setSearch(v)
        setSearchResults
    }

    const handleSendRequest = () => {

    }
    
    return (
        <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}
            scrollViewProps={{ contentContainerStyle: styles.contentContainer, style: styles.container }}
           
        >
            <Input placeholder='Search by username' containerStyle={styles.search}
                rightIcon={selectedUser ? (
                    <IonIcon name='md-checkmark' size={24} 
                        onPress={handleSendRequest} style={styles.send}
                    /> ):(
                    <IonIcon name='search-outline' size={24}/>
                )}
                value={search} onChangeText={value => handleSearch(value)}
                inputStyle={{ color: '#353440', fontSize: 18 }}
            />
            <View style={{ paddingHorizontal: 16 }}>
            { searchResults.map(item => (
                <NewContactListItem key={item._id} item={item}/>
            ))}
            </View>
        </BottomSheet>
    )
}

export default NewContactBottomSheet

const styles = StyleSheet.create({
    container: {
        height: 600, 
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    contentContainer: {
        width: '100%',
        backgroundColor: '#fefefe',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    search: {
        width: '92%',
        alignSelf: 'center',
        paddingTop: 12,
        fontSize: 24
    },
    send: {
        backgroundColor: '#0eaaa7',
        padding: 4,
        borderRadius: 16,
        overflow: 'hidden'
    }
})