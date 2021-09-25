import { Action } from '@reduxjs/toolkit'
import { put, takeLatest, call } from 'redux-saga/effects'
import { UserModel } from '../../auth/models/UserModel'
import { UsersMock } from '../../../../init/axios/mocks/UsersMock'
import { search, add, update, deletefunc } from './UserAPI'

export const actionTypes = {
    setData: '[setData] Action',
    addData: '[addData] Action',
    setFetching: '[setFetching] Action',
    Search: '[Search] Action',
    Add: '[Add] Action',
    Update: '[Update] Action',
    Delete: '[Delete] Action',
    UpdateData: '[UpdateDate] Action',
    DeleteData: '[DeleteData] Action'
}

export interface ActionWithPayload<T> extends Action {
    payload: T
}
export interface IUserStoreState {
    isFetching: boolean;
    collection: UserModel[];
}
const initialAuthState: IUserStoreState = {
    isFetching: false,
    collection: [UsersMock.newUser()],
}
export const reducer = (state: IUserStoreState = initialAuthState, action: ActionWithPayload<IUserStoreState>) => {
    switch (action.type) {
        case actionTypes.setData: {
            return { ...state, collection: action.payload?.collection }
        }
        case actionTypes.addData: {
            return { ...state, collection: [...state.collection, ...action.payload.collection] }
        }
        case actionTypes.UpdateData:
            {
               var update : UserModel[] = []
               state.collection.forEach(val => update.push(Object.assign({}, val)));
                var model = action.payload.collection[0]
                var entry = update.find(x => x.id === model.id);
                if (entry) {
                     entry.firstname = model.firstname
                     entry.lastname = model.lastname
                 }
                return { ...state, collection: [...update] }
            }
        case actionTypes.DeleteData:
            {
                var collection = [...state.collection]
                const index = collection.findIndex(x => x.id === action.payload.collection[0].id);
                collection.splice(index, 1)
                return { ...state, collection: [...collection] }
            }
        case actionTypes.setFetching: {
            return { ...state, isFetching: action.payload?.isFetching }
        }
        default:
            return state
    }
}

export const actions = {
    search: (term: string) => ({ type: actionTypes.Search, payload: term }),
    add: (model: UserModel) => ({ type: actionTypes.Add, payload: model }),
    update: (model: UserModel) => ({ type: actionTypes.Update, payload: model }),
    delete: (id: number) => ({ type: actionTypes.Delete, payload: id })
}

function* searchSaga(action) {

    yield put({ type: actionTypes.setFetching, payload: { isFetching: true } });
    const result = yield call(search, action.payload);
    yield put({ type: actionTypes.setData, payload: { collection: result.data } });
    yield put({ type: actionTypes.setFetching, payload: { isFetching: false } });
}

function* updateSaga(action) {
    yield put({ type: actionTypes.setFetching, payload: { isFetching: true } });
    const result = yield call(update, action.payload);
    yield put({ type: actionTypes.UpdateData, payload: { collection: [result.data] } });
    yield put({ type: actionTypes.setFetching, payload: { isFetching: false } });
}

function* addSaga(action) {
    yield put({ type: actionTypes.setFetching, payload: { isFetching: true } });
    const result = yield call(add, action.payload);
    action.payload.id = result.data.id
    yield put({ type: actionTypes.addData, payload: { collection: [action.payload] } });
    yield put({ type: actionTypes.setFetching, payload: { isFetching: false } });
}

function* deleteSaga(action) {
    yield put({ type: actionTypes.setFetching, payload: { isFetching: true } });
    yield call(deletefunc, action.payload);
    const user = UsersMock.newUser()
    user.id = action.payload
    yield put({ type: actionTypes.DeleteData, payload: { collection: [user] } });
    yield put({ type: actionTypes.setFetching, payload: { isFetching: false } });
}

export function* saga() {
    yield takeLatest(actionTypes.Search, searchSaga)
    yield takeLatest(actionTypes.Add, addSaga)
    yield takeLatest(actionTypes.Update, updateSaga)
    yield takeLatest(actionTypes.Delete, deleteSaga)
}
