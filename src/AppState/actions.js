/* eslint-disable no-console */
import { findIndex } from "lodash";

export const useActions = (state, dispatch) => {
  
  //CREATES A NEW USER
  const addUser = newUser => {
    let newUsers = [...state.users];
    newUsers.push(newUser);
    dispatch({
      type: "ADD_USER",
      payload: newUsers
    });
  };

  //TRIES TO LOGIN WITH THE PROVIDED CREDENTIALS
  const logIn = credentials => { 
   let currentUser = state.users.find(element => element.password === credentials.password && element.email === credentials.email);
   if(currentUser) {
    dispatch({
      type: "LOGIN",
      payload: {...currentUser}
    });
   }
   else {
     alert("login error, check your credentials");
   }
  }

  const withdraw = amount => {
    let userIndex = findIndex(state.users, element => element.email === state.currentUser.email)
    let newUsers = [...state.users];
    newUsers[userIndex].balance = newUsers[userIndex].balance - amount;
    dispatch({
      type:"UPDATE_USERS",
      payload: newUsers
    });

    dispatch({
      type:"UPDATE_USER",
      payload: {...state.currentUser, balance: state.currentUser.balance - amount}
    });
  }

  const deposit = amount => {
    let userIndex = findIndex(state.users, element => element.email === state.currentUser.email)
    let newUsers = [...state.users];
    newUsers[userIndex].balance = newUsers[userIndex].balance + amount;
    dispatch({
      type:"UPDATE_USERS",
      payload: newUsers
    });

    dispatch({
      type:"UPDATE_USER",
      payload: {...state.currentUser, balance: state.currentUser.balance + amount}
    });
  }

  const setSuccess = value => {
    dispatch({
      type:"SET_SUCCESS",
      payload: value
    });
  }

  const setError = value => {
    dispatch({
      type: "SET_ERROR",
      payload: value
    })
  }


  return {
    addUser,
    logIn,
    withdraw,
    deposit,
    setSuccess,
    setError
  };
};
