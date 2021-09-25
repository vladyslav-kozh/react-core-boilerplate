

import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../core/auth'
import {ErrorsPage} from '../core/errors/ErrorsPage'
import {RootState} from '../../init'

const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)

  return (
    <Switch>
      
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from='/auth' to='/' />
      )}

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!isAuthorized ? (
        <Redirect to='/auth/login' />
      ) : (
        <MasterLayout>
          <PrivateRoutes />
        </MasterLayout>
      )}
    </Switch>
  )
}

export {Routes}
