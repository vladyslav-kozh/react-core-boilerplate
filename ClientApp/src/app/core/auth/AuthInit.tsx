import { FC, useRef, useEffect } from 'react'
import { shallowEqual, useSelector, connect, useDispatch, ConnectedProps } from 'react-redux'
import * as auth from './redux/AuthRedux'
import { getUser } from './redux/AuthAPI'
import { RootState } from '../../../init'

const mapState = (state: RootState) => ({ auth: state.auth })
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const accessToken = useSelector<RootState>(({ auth }) => auth.accessToken, shallowEqual)

  useEffect(() => {
    const requestUser = async () => {
      console.log("requestUser")
      try {
        if (!didRequest.current) {
          const { data: user } = await getUser()
          dispatch(props.fulfillUser(user))
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(props.logout())
        }
      }

      return () => (didRequest.current = true)
    }

    if (accessToken) {
      requestUser()
    } else {
      dispatch(props.logout())
    }
  }
  , [dispatch, accessToken, props.auth.accessToken])

  return <>{props.children}</>
}

export default connector(AuthInit)
