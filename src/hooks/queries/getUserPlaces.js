import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_PLACES = gql`
    query GetUserPlaces($userId: ID!) {
        getUser(userId: $userId) {
            _id
            details {
                username
            }
            places {
                _id
                name
                avatar {
                    id
                    url
                }
                description
                publish_type
                group {
                    _id
                    avatar {
                        id
                        url
                    }
                    name
                }
                locality
                location {
                    type
                    coordinates
                }
                createdAt
            }
        }
    }
`

export const useGetUserPlacesQuery = (userId) => {
    const result = useQuery(GET_USER_PLACES, {
        variables: { userId }
    })
    return result;
}

export const useLazyGetUserPlacesQuery = () => {
    const result = useLazyQuery(GET_USER_PLACES)
    return result;
}