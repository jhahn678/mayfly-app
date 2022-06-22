import { reverseGeocodeAsync, getForegroundPermissionsAsync, requestForegroundPermissionsAsync } from 'expo-location'

export const useReverseGeocode = () => {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await getForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    },[])

    const reverseGeocode = async ({ latitude, longitude }) => {
        if(!hasPermission){
            const res = await requestForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await reverseGeocodeAsync({ latitude, longitude }))
    }
    
    return reverseGeocode
}