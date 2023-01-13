import { ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'
import client from '../apollo-client'

const App = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default App
