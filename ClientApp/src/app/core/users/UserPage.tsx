import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from "react-router";
import { Modal, Button} from "react-bootstrap";
import { UserModel } from "../auth/models/UserModel"
import { withStore } from "../../../init/redux/RootReducer"
import UserEditor from "./UserEditor";
import * as UserStore from './redux/UserRedux';
import Pagination from './Paginator'
import { UsersMock } from '../../../init/axios/mocks/UsersMock'

type Props = typeof UserStore.actions & UserStore.IUserStoreState & RouteComponentProps<{}>;

interface IState {
    search: string;
    currentNum: number;
    limitPerPage: number;
    isAddModalOpen: boolean;
    isUpdateModalOpen: boolean;
    isDeleteModalOpen: boolean;
    modelForEdit?: UserModel;
}

function paginate<T>(array: T[], pageNumber: number, limitPerPage: number): T[] {
    let rowOffset = Math.ceil((pageNumber - 1) * limitPerPage);
    return array.slice(rowOffset, rowOffset + limitPerPage);
}

const UserPage = (props: Props) => {
    const [state, setState] = useState({
        search: "",
        currentNum: 1,
        limitPerPage: 1,
        isAddModalOpen: false,
        isDeleteModalOpen: false,
        isUpdateModalOpen: false,
        modelForEdit: {}
    } as IState);


    useEffect(() => {
        const fetchData = async () => {
            props.search("")
        }
        fetchData()
    }, [])


    const toggleAddUserModal = () => {
        setState(prev => ({ ...prev, isAddModalOpen: !prev.isAddModalOpen }))
    }


    const toggleUpdateUserModal = (modelForEdit?: UserModel) => {
        setState(prev => ({
            ...prev, modelForEdit: modelForEdit,isUpdateModalOpen: !prev.isUpdateModalOpen
        }))
    }

    const toggleDeleteUserModal = (modelForEdit?: UserModel) => {
        setState(prev => ({...prev,modelForEdit: modelForEdit,isDeleteModalOpen: !prev.isDeleteModalOpen}));
    }
    const addUser = async (data: UserModel) => {
        props.add(data)
        toggleAddUserModal()
    }

    const updateUser = async (data: UserModel) => {
        props.update(data)
        toggleUpdateUserModal()
    }

    const deleteUser = (): void => {
        if (state.modelForEdit?.id) {
            props.delete(state.modelForEdit?.id)
        }
        toggleDeleteUserModal()
    }

    const onChangeSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        var val = e.currentTarget.value
        props.search(val)
        setState(prevState => ({...prevState, currentNum: 1}))
    }

    return (
        <>
            <h2>Users</h2>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-5">
                <div className="container-fluid">
                    <div className="col-3 col-sm-2 col-md-2 col-lg-1">
                        <button className="btn btn-outline-light me-2"
                            onClick={x => toggleAddUserModal()}
                            type="submit">Add</button>
                    </div>
                    <div className="col-9 col-sm-10 col-md-10 col-lg-11">
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={""}
                            onChange={onChangeSearchInput}
                            placeholder={"Search for user..."}
                        />
                    </div>
                </div>
            </nav>

            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">First Name</th><th scope="col" >Last Name</th><th scope="col" ></th>
                    </tr>
                </thead>
                <tbody>

                    {props.collection !== undefined && paginate(props.collection, state.currentNum, state.limitPerPage)
                        .map(User =>
                            <tr key={User.id}>
                                <td>{User.firstname}</td>
                                <td>{User.lastname}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-primary me-2" onClick={x => toggleUpdateUserModal(User)}>Edit</button>
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={x => toggleDeleteUserModal(User)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    <Modal show={state.isAddModalOpen} onHide={() => toggleAddUserModal()}>
                        <Modal.Header >
                            <Modal.Title>Add user</Modal.Title>
                        </Modal.Header>

                        <UserEditor data={UsersMock.newUser()} onSubmit={addUser}  >
                            {(renderEditor, handleSubmit) =>
                                <>
                                    <Modal.Body>
                                        {renderEditor()}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={x => toggleAddUserModal()}>Close</Button>
                                        <Button variant="primary" type="submit" onClick={x => handleSubmit()}>Save changes</Button>
                                    </Modal.Footer>
                                </>
                            }
                        </UserEditor>
                    </Modal>

                    <Modal show={state.isUpdateModalOpen} onHide={() => toggleUpdateUserModal()}>
                        <Modal.Header >
                            <Modal.Title>Edit User: {state.modelForEdit ? `${state.modelForEdit.firstname} ${state.modelForEdit.lastname}` : null}</Modal.Title>
                        </Modal.Header>

                        <UserEditor data={(state.modelForEdit ? state.modelForEdit : { id: 0, firstname: "", lastname: "" } as UserModel)} onSubmit={updateUser}>
                            {(renderEditor, handleSubmit) =>
                                <>
                                    <Modal.Body>
                                        {renderEditor()}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={x => toggleUpdateUserModal()}>Close</Button>
                                        <Button variant="primary" type="submit" onClick={x => handleSubmit()}>Save changes</Button>
                                    </Modal.Footer>
                                </>
                            }
                        </UserEditor>
                    </Modal>

                    <Modal show={state.isDeleteModalOpen} onHide={() => toggleDeleteUserModal()}>
                        <Modal.Header >
                            <Modal.Title>Delete user: {state.modelForEdit ? `${state.modelForEdit.firstname} ${state.modelForEdit.lastname}` : null}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Do you want to delete this user?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={x => toggleDeleteUserModal()}>Close</Button>
                            <Button variant="primary" onClick={x => deleteUser()}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>

            <Pagination
                totalResults={props.collection !== undefined ? props.collection.length : 0}
                limitPerPage={state.limitPerPage}
                currentPage={state.currentNum}
                onChangePage={(pageNum) => {
                    setState(prevState => ({
                        ...prevState,
                        currentNum: pageNum
                    }))
                }} />
        </>
    )
}
var connectedComponent = withStore(
    UserPage,
    state => state.user,
    UserStore.actions,
);
export default connectedComponent
