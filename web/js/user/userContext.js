export const userContext = { token: undefined, email: undefined , user_id:undefined };

export const isLogged = ()=>{
  if(userContext.token !== undefined) true;
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const user_id = sessionStorage.getItem("user_id");
  if(token){
    userContext.token = token;
    userContext.email = email;
    userContext.user_id = user_id;
    return true;
  }
  return false;
}

export const signin = (token, email ,user_id )=>{
  userContext.token = token;
  userContext.email = email;
  userContext.user_id = user_id;
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('user_id', user_id);
}