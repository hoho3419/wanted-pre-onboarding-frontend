export const emailValidate = (email) => {
  const regex = /@/;
  if(regex.test(email)){
    return true;
  }
  return false;
};
export const passwordValidate = (password) => {
  if(password.length >= 8){
    return true;
  }
  return false;
};