import {useContext, useEffect} from 'react';
import {Store} from "../../AppState/Store";
export default function AllData() {
  const { state, actions } = useContext(Store)
  
  useEffect(()=>{
    actions.getAllUsers();
  },[])

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Password</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>
        {state.users.map(element=> {
          return <tr key={element.email}>
          <td>{element.email}</td>
          <td>{element.name}</td>
          <td>{element.password}</td>
          <td>{element.balance}</td>
        </tr>
        })}
      </tbody>
  </table>
  )
}