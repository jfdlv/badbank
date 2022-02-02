/* eslint-disable no-console */
import axios from 'axios'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { app } from '../util/firebaseConfig'
export const useActions = (state, dispatch) => {
  const getAllUsers = () => {
    // axios.get("/account/all").then(response => {
    //for development
    axios
      .get('http://localhost:3000/account/all')
      .then((response) => {
        dispatch({
          type: 'SET_USERS',
          payload: response.data,
        })
      })
      .catch((error) => console.log(error))
  }

  //CREATES A NEW USER
  const addUser = (newUser, {setShow, setShowSpinner, setShowErrorMessage, setErrorMessage}) => {
    const authentication = getAuth()
    createUserWithEmailAndPassword(
      authentication,
      newUser.email,
      newUser.password,
    ).then((userCredential) => {
      userCredential.user.getIdToken().then((idToken) => {
        //axios.get(`/account/create/${newUser.name}/${newUser.email}/${newUser.password}`).then(response=>{
        //for development
        axios
          .get(
            `http://localhost:3000/account/create/${newUser.name}/${newUser.email}/${newUser.password}`,
            {
              headers: {
                Authorization: idToken, //the token is a variable which holds the token
              },
            },
          )
          .then((response) => {
            dispatch({
              type: 'UPDATE_USER',
              payload: newUser,
            })
            setShow(false);
            setShowSpinner(false);
          })
          .catch((error) => {
            setErrorMessage(`${error.code} ${error.message}`)
            setShowErrorMessage(true)
            setShowSpinner(false)
          })
      })
    })
    .catch((error) => {
      setErrorMessage(`${error.code} ${error.message}`)
      setShowErrorMessage(true)
      setShowSpinner(false)
    })
  }

  const signOut = () => {
    const authentication = getAuth()
    authentication.signOut()
  }

  const getUserInfo = (email) => {
    const authentication = getAuth()
    if (authentication.currentUser) {
      authentication.currentUser.getIdToken().then((idToken) => {
        console.log('idToken:', idToken)
        return axios
          .get(`http://localhost:3000/account/info/${email}`, {
            headers: {
              Authorization: idToken, //the token is a variable which holds the token
            },
          })
          .then((userInfo) => {
            const user = userInfo.data
            dispatch({
            type: 'UPDATE_USER',
              payload: user,
            })
          })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('No user logged in.')
      })
    }
  }

  //TRIES TO LOGIN WITH THE PROVIDED CREDENTIALS
  const logIn = (
    credentials,
    { setShowSpinner, setShowErrorMessage, setErrorMessage },
  ) => {
    const authentication = getAuth()
    signInWithEmailAndPassword(
      authentication,
      credentials.email,
      credentials.password,
    )
      .then((userCredential) => {
        // Signed in
        setShowSpinner(false)
      })
      .catch((error) => {
        setErrorMessage(`${error.code} ${error.message}`)
        setShowErrorMessage(true)
        setShowSpinner(false)
      })
  }

  const withdraw = (amount) => {
    const authentication = getAuth()
    // axios.get(`/account/withdraw/${state.currentUser.email}/${amount}`)
    if (authentication.currentUser) {
      authentication.currentUser.getIdToken().then((idToken) => {
        console.log('idToken:', idToken)
        axios
          .get(
            `http://localhost:3000/account/withdraw/${state.currentUser.email}/${amount}`,
            {
              headers: {
                Authorization: idToken, //the token is a variable which holds the token
              },
            },
          )
          .then((response) => {
            getUserInfo(state.currentUser.email)
          })
      })
    } else {
      console.error('user not logged in')
    }
  }

  const deposit = (amount) => {
    const authentication = getAuth()
    // axios.get(`/account/deposit/${state.currentUser.email}/${amount}`)
    if (authentication.currentUser) {
      authentication.currentUser.getIdToken().then((idToken) => {
        console.log('idToken:', idToken)
        axios
          .get(
            `http://localhost:3000/account/deposit/${state.currentUser.email}/${amount}`,
            {
              headers: {
                Authorization: idToken, //the token is a variable which holds the token
              },
            },
          )
          .then((response) => {
            getUserInfo(state.currentUser.email)
          })
      })
    } else {
      console.error('user not logged in')
    }
  }

  const setSuccess = (value) => {
    dispatch({
      type: 'SET_SUCCESS',
      payload: value,
    })
  }

  const setError = (value) => {
    dispatch({
      type: 'SET_ERROR',
      payload: value,
    })
  }

  const updateUser = (newUser) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: newUser,
    })
  }

  return {
    addUser,
    logIn,
    withdraw,
    deposit,
    setSuccess,
    setError,
    getAllUsers,
    updateUser,
    signOut,
    getUserInfo,
  }
}
