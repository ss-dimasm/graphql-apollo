import React, { FC, Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from '../components/ui/nav/nav'
import { reapitConnectBrowserSession } from './connect-session'
import { useLocation, Redirect } from 'react-router'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'
import ErrorBoundary from '../components/hocs/error-boundary'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/client'

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location?.pathname}${location?.search}`

  if (!connectSession) {
    return (
      <MainContainer>
        <PageContainer>
          <Loader label="Loading" fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <MainContainer>
      <Nav />
      <Suspense fallback={<Loader label="Loading" fullPage />}>
        <ErrorBoundary>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </ErrorBoundary>
      </Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
