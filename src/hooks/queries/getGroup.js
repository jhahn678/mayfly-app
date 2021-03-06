import { useQuery, gql } from "@apollo/client";

const GET_GROUP = gql`
query GetGroup($groupId: ID!) {
    getGroup(groupId: $groupId) {
        _id
        messages{
            _id
            user {
                _id
                details {
                    avatar {
                        url
                    }
                    username
                    fullName
                }
            }
            createdAt
            media {
                url
            }
            body
            type
            place {
                _id
                locality
                avatar {
                    url
                }
                name
                location {
                    coordinates
                }
            }
            catch {
                _id
                title
                species
                media {
                    url
                }
            }
        }
        name
        avatar {
            url
        }
        users {
            _id
            details {
                fullName
                username
                avatar {
                    url
                }   
            }
        }
        createdAt
        created_by {
            _id
            details {
                username
                fullName
                avatar {
                    url
                }  
            }
        }
    }
}
`


export const useGetGroupQuery = (groupId) => {

    const result = useQuery(GET_GROUP, {
        variables: { groupId },
        notifyOnNetworkStatusChange: true
    })

    return result;
}



export const GET_GROUP_MESSAGES = gql`
query GetGroup($groupId: ID!, $offset: Int, $limit: Int) {
    getGroup(groupId: $groupId) {
        _id
        messages(offset: $offset, limit: $limit) {
            _id
            user {
                _id
                details {
                    avatar {
                        url
                    }
                    username
                    fullName
                }
            }
            createdAt
            media {
                url
            }
            body
            type
            place {
                _id
                locality
                avatar {
                    url
                }
                name
                location {
                    coordinates
                }
            }
            catch {
                _id
                title
                species
                media {
                    url
                }
            }
        },
        total_messages
    }
}
`
