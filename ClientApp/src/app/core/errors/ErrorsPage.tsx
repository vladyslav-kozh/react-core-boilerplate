import React from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { Error404 } from './Error404'

const ErrorsPage: React.FC = () => {
  const history = useHistory()
  const redirectTo = () => {
    history.push('/')
  }
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-column-fluid text-center '>
        <Switch>
          <Route path='/error/404' exact={true}>
            <Error404 />
          </Route>
          <Redirect from='/error' exact={true} to='/error/404' />
          <Redirect to='/error/404' />
        </Switch>
        <div className='text-center'>
          <button onClick={redirectTo}  className='btn btn-lg btn-primary'>
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export { ErrorsPage }
