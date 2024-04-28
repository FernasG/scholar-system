const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailErrorMessage = 'Por favor, insira um email válido.';
const passwordErrorMessage = 'Por favor, insira sua senha.';

const getVariables = (() => {
  const emailElement = document.getElementById('email');
  const passwordElement = document.getElementById('password');

  const email = emailElement.value;
  const password = passwordElement.value;

  return { email, password };
});

const checkVariables = ((email, password) => {
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  let checkResult = true;

  if (!email || !emailRegex.test(email)) {
    emailError.textContent = emailErrorMessage;
    checkResult = false;
  } else emailError.textContent = '';

  if (!password || !passwordRegex.test(password)) {
    passwordError.textContent = passwordErrorMessage;
    checkResult = false;
  } else passwordError.textContent = '';

  return checkResult;
});

const loginRequest = (async () => {

});

const submitLoginForm = (async () => {
  const { email, password } = getVariables();

  if (!checkVariables(email, password)) return;

  await loginRequest();
});

