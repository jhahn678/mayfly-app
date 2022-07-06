import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_GROUP_CATCHES = gql`
query Query($groupId: ID!) {
    getGroup(groupId: $groupId) {
        _id
        catches {
            _id
            user {
                details {
                    fullName
                    username
                    avatar {
                    id
                    url
                    }
                }
                _id
            }
            place {
                locality
                location {
                    type
                    coordinates
                }
                _id
                avatar {
                    id
                    url
                }
            }
            location {
                type
                coordinates
            }
            title
            species
            createdAt
        }
    }
  }
`

export const useGetGroupCatchesQuery = (groupId) => {
    const result = useQuery(GET_GROUP_CATCHES, {
        variables: { groupId }
    })
    return result
}

export const useLazyGetGroupCatchesQuery = (groupId) => {
    const result = useLazyQuery(GET_GROUP_CATCHES, {
        variables: { groupId }
    })
    return result
}