import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_CATCHES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
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

export const useGetUserCatchesQuery = (userId) => {
    const result = useQuery(GET_USER_CATCHES, {
        variables: { userId }
    })
    return result;
}

export const useLazyGetUserCatchesQuery = (userId) => {
    const result = useLazyQuery(GET_USER_CATCHES, {
        variables: { userId }
    })
    return result;
}