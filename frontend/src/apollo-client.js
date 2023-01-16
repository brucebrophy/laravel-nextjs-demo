import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { csrf } from './hooks/auth'

// csrf()
//         .then(request => {
//             return request.config.headers['X-XSRF-TOKEN']
//         })
//         .catch(error => console.log(error))

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
})

const asyncAuthLink = setContext(
    request =>
        new Promise((success, fail) => {
            // do some async lookup here
            setTimeout(() => {
                success({ token: 'async found token' })
            }, 10)
        }),
)

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'X-XSRF-TOKEN': 'foobar',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default client
