/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext} from 'react';
import { Store } from './AppState/Store';
import { useLocation } from 'react-router-dom'
export default function NavBar() { 
  const {state,actions} = useContext(Store);
  const location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={location.pathname==="/CreateAccount/" ? "nav-link active" : "nav-link"} href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className={location.pathname==="/login/" ? "nav-link active" : "nav-link"} href="#/login/" aria-label="login-link">{state.currentUser ? "Profile" : "Login"}</a>
          </li>
          {state.currentUser && <li className="nav-item">
            <a className={location.pathname==="/deposit/" ? "nav-link active" : "nav-link"} href="#/deposit/">Deposit</a>
          </li>}
          {state.currentUser && <li className="nav-item">
            <a className={location.pathname==="/withdraw/" ? "nav-link active" : "nav-link"} href="#/withdraw/">Withdraw</a>
          </li>}
          <li className="nav-item">
            <a className={location.pathname==="/alldata/" ? "nav-link active" : "nav-link"} href="#/alldata/">AllData</a>
          </li>      
          {state.currentUser &&
            <li className="nav-item">
            <a className={location.pathname==="/login/" ? "nav-link active" : "nav-link"} onClick={actions.signOut} aria-label="login-link">Logout</a>
            </li>
          }
        </ul>
      </div>
    </nav>
    </>
  );
}