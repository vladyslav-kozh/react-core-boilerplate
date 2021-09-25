import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../redux/AuthAPI'

const initialValues = {
  email: 'admin@admin.com',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Incorrect email format')
    .min(3, 'Minimum 3 chars')
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        requestPassword(values.email)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >

        <h2>Forgot Password</h2>
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text '>
              Sorry,  please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
            <div className='text-info'>Password sent. </div>
        )}
        
        
        <div className='mb-10 mb-2'>
          <label className='form-label fw-bolder '>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>

        <div className='text-center mb-5'>
          <button
            type='submit'
            className='btn btn-lg btn-primary w-100 mb-2'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              className='btn btn-lg btn-light-primary w-100'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
      </form>
    </>
  )
}
