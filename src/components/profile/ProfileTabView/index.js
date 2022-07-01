import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { Button, TabView } from "@rneui/themed";
import { useState, useEffect, useReducer } from 'react'
import { makeFakeUsers } from '../../../../test-data/groups';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useAuthContext } from '../../../store/context/auth';
import { initialState, reducer } from './reducer';


const ProfileTabView = () => {

    const [formState, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: 'LOAD_DATA', value: makeFakeUsers(1)[0].details })
    },[])

    const handleSave = async () => {
        
    }
    

    return (
        <TabView.Item style={{ width: '100%' }}>

            <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingTop: 28 }}>

                <View style={styles.inputContainer}>
                    <TextInput style={{...styles.input, borderColor: formState?.firstName.isFocused ? 'black' : 'rgb(220,220,220)'}}  
                    value={formState.firstName.value} onChangeText={value => dispatch({ type: 'FIRSTNAME', value })}
                    onFocus={() => dispatch({ type: 'FIRSTNAME_FOCUS'})} onBlur={() => dispatch({ type: 'FIRSTNAME_BLUR'})}/>
                    <Text style={styles.label}>First name</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={{...styles.input, borderColor: formState?.lastName.isFocused ? 'black' : 'rgb(220,220,220)' }} 
                    value={formState.lastName.value} onChangeText={value => dispatch({ type: 'LASTNAME', value })}
                    onFocus={() => dispatch({ type: 'LASTNAME_FOCUS'})} onBlur={() => dispatch({ type: 'LASTNAME_BLUR'})}/>
                    <Text style={styles.label}>Last name</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={{...styles.input, borderColor: formState?.location.isFocused ? 'black' : 'rgb(220,220,220)' }} 
                    value={formState.location.value} onChangeText={value => dispatch({ type: 'LOCATION', value })}
                    onFocus={() => dispatch({ type: 'LOCATION_FOCUS'})} onBlur={() => dispatch({ type: 'LOCATION_BLUR'})}/>
                    <Text style={styles.label}>Location</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={{...styles.inputBio, borderColor: formState?.bio.isFocused ? 'black' : 'rgb(220,220,220)'  }}  
                    multiline={true} value={formState.bio.value} onChangeText={value => dispatch({ type: 'BIO', value })}
                    onFocus={() => dispatch({ type: 'BIO_FOCUS'})} onBlur={() => dispatch({ type: 'BIO_BLUR'})}/>
                    <Text style={styles.label}>Bio</Text>
                </View>

                <Button containerStyle={{ width: '90%', marginLeft: '5%', borderRadius: 8 }}
                disabled={!formState?.edited} onPress={handleSave}>
                    Save
                </Button>

            </ScrollView>

        </TabView.Item>
    )
}

export default ProfileTabView

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        width: '90%',
        marginLeft: '5%',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        borderColor: 'rgb(220,220,220)'
    },
    inputBio: {
        width: '90%',
        marginLeft: '5%',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        height: 120, 
        paddingTop: 12, 
        paddingBottom: 12,
    },
    label: {
        backgroundColor: '#fefefe',
        fontSize: 12,
        position: 'absolute',
        left: 36,
        top: -7,
        paddingHorizontal: 4
    }
})
