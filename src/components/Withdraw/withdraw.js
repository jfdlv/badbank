import {useContext} from 'react';
import {Store} from "../../AppState/Store";
import Card from '../../util/card';
import {useFormik} from "formik";
import Error from "../../util/error";

export default function Withdraw() {
  const {state, actions} = useContext(Store)

  const formik = useFormik({
    initialValues: {
      amount: 0
    },
    onSubmit: values => {
      console.log(values);
      if(values.amount <= state.currentUser.balance) {
        let amount = parseFloat(values.amount);
        actions.withdraw(amount);
        actions.setSuccess(true)
        setTimeout(()=>{
          actions.setSuccess(false);
        },3000)
      }
      else { 
        actions.setError(true)
        setTimeout(()=>{
          actions.setError(false);
        },3000)
      }
    },
    validate: values => {
      let errors = {};
      if(!values.amount || values.amount === "") errors.amount = "Field required";
      if(values.amount !== "" && isNaN(parseFloat(values.amount))) errors.amount = "Just Numbers allowed";
      if(values.amount < 0) errors.amount = "Negative Numbers not allowed";
      return errors;
    }
  })

  return (
    <>
    <h3>WITHDRAW</h3>
    <Card
      bgcolor="secondary"
      body= {
        <>
        {state.currentUser && <form onSubmit={formik.handleSubmit} data-testid="withdraw-form">
          <div className="mb-3">
            <div className="row">
                <div className="col">Balance: </div>
                <div className="col" data-testid="user-balance">{state.currentUser.balance}</div>
            </div>
            <div className="amount-container">
                <div className="row">
                  <h4>Withdraw Amount</h4>
                </div>
                <div className="fields">
                  <input type="text" className="form-control" id="amountField" name="amount" onChange={formik.handleChange} value={formik.values.amount} aria-label="withdraw-field"/>
                  {formik.errors.amount ? <Error id="emailError" message={formik.errors.amount}/> : null}
                  <button type="submit" className="btn btn-primary" id="submitBtn" disabled={!(formik.isValid && formik.dirty)}>Withdraw</button>
                </div>
            </div>
          </div>
        </form>}
        {!state.currentUser && 
          <div>You can't see this content without being logged in.</div>
        }
        </>
      }
    />
    {state.success && <div className="alert alert-success" role="alert">
      Succes!
    </div>}
    {state.error && <Error message="transaction failed"/>}
    </>
    
    
  )
}