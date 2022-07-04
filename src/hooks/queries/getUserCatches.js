import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_CATCHES = gql`
    query GetUserCatches($userId: ID!) {
        getUser(userId: $userId) {
            _id
            details {
                username
            }
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
                rig
                media {
                    id
                    url
                }
                createdAt
                place {
                    name
                    avatar {
                        id
                        url
                    }
                    location {
                        type
                        coordinates
                    }
                }
                location {
                    type
                    coordinates
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