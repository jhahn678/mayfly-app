import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_CATCHES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            _id
            catches {
                _id
                publish_type
                title
                species
                length {
                    value
                    unit
                }
                weight {
                    value
                    unit
                }
                createdAt
                media {
                    url
                    id
                }
                place {
                    _id
                }
            }
        }
    }
`

export const useGetUserProfileQuery = (userId) => {
    const result = useQuery(GET_USER_PROFILE, {
        variables: { userId }
    })
    return result;
}

export const useLazyGetUserProfileQuery = (userId) => {
    const result = useLazyQuery(GET_USER_PROFILE, {
        variables: { userId }
    })
    return result;
}