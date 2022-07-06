import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_GROUPS = gql`
    query GetUserGroups($userId: ID!) {
        getUser(userId: $userId) {
            groups {
                _id
                name
                avatar {
                    url
                }
                latest_message {
                    _id
                    user {
                        details {
                            username
                            avatar {
                                url
                            }
                            firstName
                        }
                        _id
                    }
                    type
                    createdAt
                    body
                }
            }
        }
    }
`


export const useGetUserGroups = (userId) => {
    const result = useQuery(GET_USER_GROUPS, {
        variables: { userId }
    })
    return result;
}

export const useLazyGetUserGroups = () => {
    const result = useLazyQuery(GET_USER_GROUPS)
    return result;
}