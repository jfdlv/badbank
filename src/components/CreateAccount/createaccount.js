import {useContext, useState} from 'react';
import Card from '../../util/card';
import {Store} from "../../AppState/Store";
import { useFormik } from 'formik';
import Error from '../../util/error';

export default function CreateAccount() {
  const [show, setShow] = useState(true);
  // const [status, setStatus]     = useState('');
  const {actions} = useContext(Store)

  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      password: ''
    },
    onSubmit: values => {
     console.log(values);
     actions.addUser({...values, balance: 0});
     alert("success!")
     setShow(false);
    },
    onReset: values => {
      setShow(true);
    },
    validate: values => {
      let errors = {};
      if(!values.name) errors.name = "Field required";
      if(!values.email) errors.email = "Field required";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid Email';
      if(!values.password) errors.password = "Field required";
      if(values.password.length < 8) errors.password = "Password needs to be more than 8 characters";
      return errors;
    }
  })

  return (
    <>
    <h3>CREATE ACCOUNT</h3>
    <Card
      bgcolor="primary"
      // status={status}
      body={show ? (  
        <form onSubmit={formik.handleSubmit}>
          Name<br/>
          <input type="input" className="form-control" id="name" name="name" placeholder="Enter name" onChange={formik.handleChange} value={formik.values.name}/><br/>
          {formik.errors.name ? <Error message={formik.errors.name}/> : null}
          Email address<br/>
          <input type="input" className="form-control" id="email" name="email" placeholder="Enter email" onChange={formik.handleChange} value={formik.values.email}/><br/>
          {formik.errors.email ? <Error message={formik.errors.email}/> : null}
          Password<br/>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={formik.handleChange} value={formik.values.password}/><br/>
          {formik.errors.password ? <Error message={formik.errors.password}/> : null}
          <button type="submit" className="btn btn-light" id="submitBtn" disabled={!(formik.isValid && formik.dirty)}>Create Account</button>
        </form>
      ):(
        <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={formik.handleReset}>Add another account</button>
        </>
      )}
    />
    </>
  )
}