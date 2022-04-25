import React, { FC } from 'react'

import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import '@reapit/elements/dist/index.css'

import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
    </ErrorBoundary>
  )
}

export default App
