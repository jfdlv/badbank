/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useActions } from './actions'
// eslint-disable-next-line no-unused-vars
import { app } from '../util/firebaseConfig'

export const Store = React.createContext()

const initialState = {
  users: [],
  currentUser: null,
  success: false,
  showError: false,
}

// eslint-disable-next-line consistent-return
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload }
    case 'LOGIN':
      return { ...state, currentUser: action.payload }
    case 'UPDATE_USERS':
      return { ...state, users: action.payload }
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      break
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)
  const value = { state, dispatch, actions }

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        actions.updateUser(null)
        // eslint-disable-next-line no-console
        console.log('User is not logged in')
      } else {
        actions.getUserInfo(firebaseUser.email)
      }
    })
  }, [])

  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
