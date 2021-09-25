import { UserModel} from "../auth/models/UserModel"
import { Formik, Field  } from 'formik';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'First Name too short')
    .max(50, 'First Name too Long')
    .required('First Name required'),
    lastname: Yup.string()
    .min(2, 'Last Name too short ')
    .max(50, 'Last Name too long')
    .required('Last Name required')
});

export interface IProps {
    data: UserModel;
    onSubmit: (data: UserModel) => void;
    children: (renderEditor: () => JSX.Element, submit: () => void) => JSX.Element;
}
const UserEditor = (props: IProps) => {

    const onSubmitForm = (values: UserModel) => {
        props.onSubmit(values);
    }

    const renderEditor = (values: UserModel) => {
      console.log(values)
      return (
        <form>
           <Field name="firstname">
             {({
               field, 
               form: { touched, errors }, 
               meta,
             }) => (
              <div className="form-floating mb-3">
                 <input type="text" placeholder="First Name" className="form-control" {...field} />
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
                  <label htmlFor="firstname" >First Name</label>
               </div>
             )}
           </Field>
           <Field name="lastname">
             {({
               field, 
               form: { touched, errors }, 
               meta,
             }) => (

              <div className="form-floating mb-3">
                 <input type="text" placeholder="Last Name" className="form-control" {...field} />
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
                  <label htmlFor="lastname" >Last Name</label>
               </div>

             )}
           </Field>
        </form>)
    }

    return <Formik 
        initialValues={props.data}
        onSubmit={(values, { setSubmitting }) => {
            onSubmitForm(values);
        }}
        validationSchema={DisplayingErrorMessagesSchema}
    >
        {({ values, handleSubmit }) => {
            return props.children(() => renderEditor(values), handleSubmit);
        }}
    </Formik>;
}
export default UserEditor