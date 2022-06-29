import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, Dimensions } from 'react-native'
import { useState, useEffect, useReducer} from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles'
import { Avatar, FAB, Tab, TabView } from '@rneui/themed'
import { makeFakeGroup } from '../../../../test-data/groups'
import CreateHeader from '../../../components/headers/CreateHeader'
import PrimaryBackground from '../../../components/backgrounds/PrimaryBackground'
import { useImagePicker } from '../../../hooks/utils/useImagePicker'
import ViewableContact from '../../../components/groups/ViewableContact'
import PlacesListItem from '../../../components/groups/PlacesListItem'
import CatchListItem from '../../../components/places/CatchListItem'
import { initialState, reducer } from './reducer'



const GroupSettingsScreen = ({ groupId }) => {

    const { width: screenWidth } = Dimensions.get('window')

    const [formState, dispatch] = useReducer(reducer, initialState)

    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        dispatch({ type: 'LOAD_DATA', value: makeFakeGroup(20, 4) })
    },[])


    const openImagePicker = useImagePicker()

    const handlePickImage = async () => {
        const { cancelled, ...image } = await openImagePicker()
        if(cancelled === false) dispatch({ type: 'AVATAR', value: image })
        //upload image and mutate group
    }

    const handleSaveChanges = async () => {

    }

    return (
        <PrimaryBackground style={styles.container}>
            <CreateHeader title={formState.name.value}
                rightNode={
                    <FAB disabled={formState.form.edited === false}
                    icon={<IonIcon name='return-down-forward' size={24}/>} 
                    style={globalStyles.FABshadow}
                    disabledStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)', opacity: .4 }}
                    onPress={handleSaveChanges}
                    />
                }
            />

            <View style={styles.avatarSection}>
                <Avatar size={84} 
                    icon={{ name: 'image-plus', type: 'material-community' }} 
                    containerStyle={{ backgroundColor: 'rgba(53, 52, 64, .3)'}} 
                    rounded source={{ uri: formState.avatar.uri || null }} onPress={handlePickImage}
                />
                <View style={styles.nameSection}>
                    <TextInput placeholder='Group name'
                        placeholderTextColor='rgba(53, 52, 64, .4)'
                        style={styles.input}
                        value={formState.name.value}
                        onChangeText={value => dispatch({ type: 'NAME', value: value })}
                    />
                    <Text style={styles.members}>{`${formState.users.length} members`}</Text>
                </View>
            </View>

            <View style={styles.main}>

                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.addUsers}>
                        <Text style={{ fontSize: 18, color: '#0eaaa7', marginRight: 6}}>Add users</Text>
                        <IonIcon name='person-add-outline' size={20} color='#0eaaa7'/>
                    </View>
                </TouchableOpacity>

                <Tab value={tabIndex} onChange={e => setTabIndex(e)} scrollable
                    indicatorStyle={{ backgroundColor: '#0eaaa7', height: 3 }}
                    containerStyle={{ backgroundColor: '#fefefe', marginTop: 8 }}
                >
                    <Tab.Item title='Members' titleStyle={{ fontSize: 14 }}/>
                    <Tab.Item title='Places' titleStyle={{ fontSize: 14 }}/>
                    <Tab.Item title='Catches' titleStyle={{ fontSize: 14 }}/>
                    <Tab.Item title='Media' titleStyle={{ fontSize: 14 }}/>
                </Tab>

                <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
                    <TabView.Item style={{ width: '100%' }}>
                        <FlatList data={formState.users}
                            renderItem={({ item }) =>  (
                                <ViewableContact item={item} style={{ backgroundColor: '#fefefe' }}/>
                            )}
                            keyExtractor={item => item._id}
                            contentContainerStyle={styles.membersList}
                            ItemSeparatorComponent={() => <View style={{ height: 2 }}/>}
                        />
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                        <FlatList data={formState.places}
                        renderItem={({ item }) => <PlacesListItem item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.membersList}
                        ItemSeparatorComponent={() => <View style={{ height: 4 }}/>}
                        />
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                        <FlatList data={formState.catches}
                        renderItem={({ item }) => (
                            <CatchListItem data={item} displayAsFirstName={true} style={{ backgroundColor: '#fefefe', marginVertical: 0 }}/>
                        )}
                        keyExtractor={item => item._id}
                        contentContainerStyle={styles.membersList}
                        ItemSeparatorComponent={() => <View style={{ height: 4 }}/>}
                        />
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                        <FlatList data={formState.media}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.url }} style={{ height: (screenWidth*.49), width: '49%'}}/>
                            )}
                            keyExtractor={item => item.id} numColumns={2} 
                            columnWrapperStyle={{ justifyContent: 'space-evenly', }}
                            contentContainerStyle={styles.imageGrid} horizontal={false}
                            ItemSeparatorComponent={() => <View style={{ height: (screenWidth * .01) }}/>}
                        />
                    </TabView.Item>
                </TabView>

            </View>

        </PrimaryBackground>
    )
}

export default GroupSettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3ea9e2'
    },
    avatarSection: {
        marginTop: 6,
        width: '100%',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameSection: {
        width: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        fontSize: 24,
        marginLeft: 10,
        paddingLeft: 2,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(53, 52, 64, .3)',
        color: '#fefefe',
    },
    members: {
        margin: 0,
        padding: 0,
        paddingLeft: 14,
        color: '#fefefe'
    },
    main: {
        flex: 1,
        width: '100%',
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,.8)'
    },
    addUsers: {
        backgroundColor: '#fefefe',
        width: '100%',
        height: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomColor: 'rgb(220,220,220)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: .5,
        shadowOffset: { height: .5 }
    },
    membersList: {
        marginTop: 8,
        display: 'flex',
        paddingHorizontal: 4
    }
})