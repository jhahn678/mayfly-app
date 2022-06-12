import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER = gql`
    query GetUser($userId: ID!){
        getUser(userId: $userId){
            _id
            details{
                firstName
                lastName
                fullName
            }
        }
    }
`

export const useGetUserQuery = (userId) => {
    const result = useQuery(GET_USER, {
        variables: { userId }
    })
    return result;
}

export const userLazyGetUserQuery = (userId) => {
    const result = useLazyQuery(GET_USER, {
        variables: { userId }
    })
    return result;
}
