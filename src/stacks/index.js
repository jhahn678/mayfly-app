import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { useAuthContext } from "../store/context/auth";

const RootStack = () => {

    const { isSignedIn, token } = useAuthContext()

    return (
        <NavigationContainer>
            { isSignedIn ? <AppStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}

export default RootStack;