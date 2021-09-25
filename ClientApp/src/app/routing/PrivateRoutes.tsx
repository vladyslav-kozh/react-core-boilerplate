import {Redirect, Route, Switch} from 'react-router-dom'
import {Dashboard} from '../core/Dashboard'
import UserPage from '../core/users/UserPage'

export function PrivateRoutes() {
  return (
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route exact path='/users' component={UserPage} />

        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
  )
}
