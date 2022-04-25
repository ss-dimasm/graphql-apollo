import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { reapitConnectBrowserSession } from '../core/connect-session'

const httpLink = new HttpLink({ uri: 'https://graphql.dev.paas.reapit.cloud/graphql' })

const authLink = setContext(async (_, { headers }) => {
  const session = await reapitConnectBrowserSession.connectSession()

  if (!session) {
    return headers
  }

  const { accessToken, idToken } = session

  return {
    headers: {
      ...headers,
      authorization: idToken,
      'reapit-connect-token': accessToken,
    },
  }
})

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export default client
