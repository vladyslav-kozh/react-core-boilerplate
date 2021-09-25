import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ResgisterUser} from './components/Register'
import {ForgotPassword} from './components/Forgot'
import {Login} from './components/Login'
export function AuthPage() {
  return (
    <div className='d-flex flex-column flex-column-fluid' >
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <div className='rounded shadow-sm p-10  mx-auto'>
          <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/register' component={ResgisterUser} />
            <Route path='/auth/forgot-password' component={ForgotPassword} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </div>
    </div>
  )
}
