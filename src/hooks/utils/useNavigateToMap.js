import { useNavigation } from '@react-navigation/core'


//currentLocation: Navigates to map and autofocuses on current location
//snapshot: Passes snapshot of map after saving
//groupId: Loads group pins
//placeId: Loads place pins
//userId: Loads user pins
//replace: On save replace screen
//save: On save redirect to New place screen

export const useNavigateToMap = () => {

    const navigation = useNavigation()

    const navigateToMap = ({ currentLocation=false, snapshot=false, save=false, replace=false, groupId=null, placeId=null, userId=null }) => {
        navigation.navigate('Map', { 
            currentLocation,
            snapshot,
            groupId,
            placeId,
            userId,
            replace,
            save
        })
    }

    return navigateToMap;
}