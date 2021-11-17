import { waitFor, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {StoreProvider} from './AppState/Store';
import { createHashHistory } from "history";

test('withdraw', async () => {
  const {rerender} = render(
  <StoreProvider>
      <App/>
  </StoreProvider>);
  const history = createHashHistory({ initialEntries: ["/"] });
  history.push("/login");
  await waitFor(() => {
    const emailField = screen.getByRole('textbox', {name: 'email-field'});
    fireEvent.change(emailField, {target: {value: 'abel@mit.edu'}});
    expect(emailField.value).toBe("abel@mit.edu");
    const passwordField = screen.getByLabelText(/password/i);
    fireEvent.change(passwordField, {target: {value: 'secret'}});
    expect(passwordField.value).toBe('secret');
    const loginButton = screen.getByRole('button', {name: 'login-button'});
    userEvent.click(loginButton);
    fireEvent.submit(screen.getByTestId("login-form"));
  });
  history.push("/withdraw");
  await waitFor(()=>{
    const withdrawField = screen.getByRole('textbox', {name: 'withdraw-field'});
    fireEvent.change(withdrawField, {target: {value: '30'}});
    // console.log(withdrawField.value);
    fireEvent.submit(screen.getByTestId("withdraw-form"));
    rerender(
      <StoreProvider>
          <App/>
      </StoreProvider>)
    
  })

  await waitFor(()=>{
    expect(screen.getByTestId("user-balance").innerHTML).toBe('70');
  })
});

test('deposit', async () => {
  const {rerender} = render(
  <StoreProvider>
      <App/>
  </StoreProvider>);
  // const {getByRole,getByLabelText, getByTestId, getByText} = getQueriesForElement(root);
  const history = createHashHistory({ initialEntries: ["/"] });
  history.push("/login");
  await waitFor(() => {
    const emailField = screen.getByRole('textbox', {name: 'email-field'});
    fireEvent.change(emailField, {target: {value: 'abel@mit.edu'}});
    expect(emailField.value).toBe("abel@mit.edu");
    const passwordField = screen.getByLabelText(/password/i);
    fireEvent.change(passwordField, {target: {value: 'secret'}});
    expect(passwordField.value).toBe('secret');
    const loginButton = screen.getByRole('button', {name: 'login-button'});
    userEvent.click(loginButton);
    fireEvent.submit(screen.getByTestId("login-form"));
  });
  history.push("/deposit");
  await waitFor(()=>{
    const depositField = screen.getByRole('textbox', {name: 'deposit-field'});
    fireEvent.change(depositField, {target: {value: '50'}});
    // console.log(withdrawField.value);
    fireEvent.submit(screen.getByTestId("deposit-form"));
    rerender(
      <StoreProvider>
          <App/>
      </StoreProvider>)
    
  })

  await waitFor(()=>{
    expect(screen.getByTestId("user-balance").innerHTML).toBe('120');
  })
});
