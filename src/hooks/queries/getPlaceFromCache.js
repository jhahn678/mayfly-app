import { gql, useApolloClient } from '@apollo/client'

const GET_PLACE_LOCATION = gql`
    fragment cachedPlace on Place {
        _id
        name
        locality
        createdAt
        location {
            coordinates
        }
    }
`


export const useGetPlaceFromCache = () => {
    
    const client = useApolloClient()

    const getPlace = (placeId) => {

        const data = client.readFragment({
            id: placeId,
            fragment: GET_PLACE_LOCATION
        })
        return data;
    }

    return { getPlace }

}