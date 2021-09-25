import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {LayoutProvider} from '../layout/LayoutProvider'
import AuthInit from './core/auth/AuthInit'
import {Routes} from './routing/Routes'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  return (
      <BrowserRouter basename={basename}>
          <LayoutProvider>
            <AuthInit>
              <Routes />
            </AuthInit>
          </LayoutProvider>
      </BrowserRouter>
  )
}

export {App}
