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

const handleLoginError = (async ({ response: { data: { message } } }) => {
  const alertTextElement = document.querySelector('.alert-message');
  const alertElement = document.querySelector('.alert-styled');

  alertTextElement.textContent = message;
  alertElement.classList.add('show');

  await delay(3);

  alertElement.classList.remove('show');

  return null;
});

const loginRequest = (async (email, password) => {
  const response = await axios
    .post('/api/users/login', { email, password })
    .then(({ data }) => data)
    .catch(handleLoginError);

  if (!response) return null;

  const { id, username, session_token } = response;
  Storage.setMany({ id, email, username, session_token });
  window.location.assign('home');
});

const submitLoginForm = (async () => {
  const { email, password } = getVariables();

  if (!checkVariables(email, password)) return;

  await loginRequest(email, password);
});
