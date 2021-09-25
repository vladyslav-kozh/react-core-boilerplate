import ReactDOM from 'react-dom'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as redux from './init'
import store, {persistor} from './init/redux/Store'
import axios from 'axios'
import {App} from './app/App'

import './assets/dist/css/bootstrap.min.css'

const {PUBLIC_URL} = process.env

//comment line redux.mockAxios ...  to enable ASP.Net Core API moqs instead react moqs
redux.mockAxios(axios)

redux.configAxios(axios, store)

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <App basename={PUBLIC_URL} />
      </PersistGate>
    </Provider>
    </>,
  document.getElementById('root')
)
