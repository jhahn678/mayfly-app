import { useNavigation } from '@react-navigation/core'


//currentLocation: Navigates to map and autofocuses on current location
//selectPlace: Map pins will be in select mode, instead of redirecting
//snapshot: Passes snapshot of map after saving
//groupId: Loads group pins
//placeId: Loads place pins
//userId: Loads user pins
//replace: On save replace screen
//save: On save redirect to New place screen
//catches: show catches based on user/group ID; default false
//places: show places based on user/group ID; default true
//showToggle: show toggle box for places/catches

export const useNavigateToMap = () => {

    const navigation = useNavigation()

    const navigateToMap = ({ 
        currentLocation=false, 
        selectPlace=false, 
        snapshot=false, 
        save=false, 
        replace=false, 
        groupId=null, 
        placeId=null, 
        userId=null,
        catches=false,
        places=true,
        showToggle=true

    }) => {
        navigation.navigate('Map', { 
            currentLocation,
            selectPlace,
            snapshot,
            groupId,
            placeId,
            userId,
            replace,
            save,
            catches,
            places,
            showToggle
        })
    }

    return navigateToMap;
}