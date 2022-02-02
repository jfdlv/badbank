import { Spinner, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react'
import { useFormik } from 'formik';
import Card from '../../util/card';
import { Store } from '../../AppState/Store';
import Error from '../../util/error';

export default function Login() {
  // TODO: add a const called formik assigned to useFormik()
  const { state, actions } = useContext(Store)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setShowSpinner(true)
      actions.logIn(values, {
        setShowSpinner,
        setShowErrorMessage,
        setErrorMessage,
      })
    },
    validate: (values) => {
      let errors = {}
      if (!values.email) errors.email = 'Field required'
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = 'Username should be an email'
      if (!values.password) errors.password = 'Field required'
      return errors
    },
  })
  return (
    <Card
      bgcolor="primary"
      header={state.currentUser ? 'Profile' : 'Login'}
      body={
        !state.currentUser ? (
          <div>
            {showSpinner && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            <form onSubmit={formik.handleSubmit} data-testid="login-form">
              <div className="mb-3">
                <div>Email</div>
                <input
                  type="text"
                  className="form-control"
                  id="emailField"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  aria-label="email-field"
                />
                {formik.errors.email ? (
                  <Error id="emailError" message={formik.errors.email} />
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="pswField">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pswField"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  aria-label="password-field"
                />
                {formik.errors.password ? (
                  <Error id="emailError" message={formik.errors.password} />
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-secondary"
                id="submitBtn"
                aria-label="login-button"
              >
                Login
              </button>
            </form>
            <br />
            {showErrorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
        ) : (
          <div>
            <div id="login-message">Login Succesful!</div>
            <br /> Hello,{JSON.stringify(state.currentUser)}
          </div>
        )
      }
    />
  )
}
