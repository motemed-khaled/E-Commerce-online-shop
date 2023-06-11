import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { isLogged, signin } from './userContext';

if(isLogged()){
  window.location.href = '/index.html'
}

const firtNameField = document.querySelector('.first-signup-input')
const lastNameField = document.querySelector('.last-signup-input')
const emailField = document.querySelector('.email-signup-input');
const passwordField = document.querySelector('.pwd-signup-input');
const loginBtn = document.querySelector('.signup-btn');

loginBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const res = await fetchData(endpoints.registerUser.url, endpoints.registerUser.method, {
      first_name: firtNameField.value,
      last_name: lastNameField.value,
      email: emailField.value,
      password: passwordField.value,
    });
    signin(res.token, res.email);
    window.location.href = '/index.html'
  } catch (error) {
    console.log(error);
  }
});
