import { gql, useQuery } from '@apollo/client'

const GET_USER_CONTACTS = gql`
    query Query($userId: ID!) {
        getUser(userId: $userId) {
            _id
            contacts {
                _id
                details {
                    firstName
                    lastName
                    fullName
                    username
                    avatar {
                        url
                    }
                }
            }
            pending_contacts {
                createdAt
                status
                user {
                    _id
                    details {
                        firstName
                        lastName
                        fullName
                        username
                        avatar {
                            url
                        }
                    }
                }
            }
        }
    }
`


export const useGetUserContactsQuery = (userId) => {
    const result = useQuery(GET_USER_CONTACTS, {
        variables: { userId }
    })
    return result
}