import { fetchData } from '../fetch/fetch';
import { endpoints } from '../fetch/endpoints';
import { isLogged, signin } from './userContext';

if(isLogged()){
  window.location.href = '/index.html'
}

const emailField = document.querySelector('.email-signin-input');
const passwordField = document.querySelector('.pwd-signin-input');
const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const res = await fetchData(endpoints.loginUser.url, endpoints.loginUser.method, {
      email: emailField.value,
      password: passwordField.value,
    });
    signin(res.token, res.email , res._id);
    window.location.href = '/index.html';
  } catch (error) {
    console.log(error);
  }
});
