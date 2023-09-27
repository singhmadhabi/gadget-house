const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
/*
const validatePassword = (password) => {
  return "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$".test(
    password
  );
  console.log(validatePassword);
};
*/

module.exports = { validateEmail };
