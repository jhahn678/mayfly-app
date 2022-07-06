import { gql, useLazyQuery } from '@apollo/client'

const GET_PLACE_LOCATION = gql`
    query Query($placeId: ID!) {
        getPlace(placeId: $placeId) {
            _id
            name
            user {
                _id
                details {
                    username
                    fullName
                    firstName
                }
            }
            location {
                coordinates
            }
        }
    }
`


export const useLazyGetPlaceLocationQuery = () => {
    const result = useLazyQuery(GET_PLACE_LOCATION)
    return result
}