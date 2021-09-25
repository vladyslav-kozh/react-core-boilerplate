import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { connect } from "react-redux";
import * as auth from '../../app/core/auth/redux/AuthRedux'
import * as userStore from '../../app/core/users/redux/UserRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  user: userStore.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => RootState): void;
}

export function withStore<TStoreState, TActionCreators, TComponent extends React.ComponentType<TStoreState & TActionCreators & any>>(
  component: TComponent,
  stateSelector: (state: RootState) => TStoreState,
  actionCreators: TActionCreators
): TComponent {
  return <TComponent> <unknown>connect(stateSelector, actionCreators)(component);
}

export function* rootSaga() {
  yield all([auth.saga(), userStore.saga()])
}
