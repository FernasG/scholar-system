const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const emailErrorMessage = 'Por favor, insira um email válido.';
const passwordErrorMessage = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
const usernameErrorMessage = 'O nome de usuário deve ter pelo menos 10 caracteres.';
const confirmPasswordErrorMessage = 'As senhas não coincidem.';

const getVariables = () => {
  const usernameElement = document.getElementById('username');
  const emailElement = document.getElementById('email');
  const passwordElement = document.getElementById('password');
  const confirmPasswordElement = document.getElementById('confirm-password');

  const username = usernameElement.value;
  const email = emailElement.value;
  const password = passwordElement.value;
  const confirmPassword = confirmPasswordElement.value;

  return { username, email, password, confirmPassword };
};

const checkVariables = (username, email, password, confirmPassword) => {
  const usernameError = document.getElementById('username-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  let checkResult = true;

  if (!username || username.length < 10) {
    usernameError.textContent = usernameErrorMessage;
    checkResult = false;
  } else {
    usernameError.textContent = '';
  }

  if (!email || !emailRegex.test(email)) {
    emailError.textContent = emailErrorMessage;
    checkResult = false;
  } else {
    emailError.textContent = '';
  }

  if (!password || !passwordRegex.test(password)) {
    passwordError.textContent = passwordErrorMessage;
    checkResult = false;
  } else {
    passwordError.textContent = '';
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = confirmPasswordErrorMessage;
    checkResult = false;
  } else {
    confirmPasswordError.textContent = '';
  }

  return checkResult;
};

const handleSignupError = async ({ response: { data: { message } } }) => {
  const alertTextElement = document.querySelector('.alert-message');
  const alertElement = document.querySelector('.alert-styled');

  alertTextElement.textContent = message;
  alertElement.classList.add('show');

  await new Promise(resolve => setTimeout(resolve, 3000));

  alertElement.classList.remove('show');

  return null;
};

const displaySuccessMessage = async () => {
  const successMessageElement = document.getElementById('success-message');
  successMessageElement.textContent = 'Usuário criado com sucesso! Redirecionando para a tela de login...';
  successMessageElement.classList.add('show');

  await new Promise(resolve => setTimeout(resolve, 3000));

  successMessageElement.classList.remove('show');
  window.location.href = '/';
};

const signupRequest = async (username, email, password) => {
  const response = await axios
    .post('/api/users', { username, email, password })
    .then(({ data }) => data)
    .catch(handleSignupError);

  if (!response) return null;

  await displaySuccessMessage();
};

const submitSignupForm = async () => {
  const { username, email, password, confirmPassword } = getVariables();

  if (!checkVariables(username, email, password, confirmPassword)) return;

  await signupRequest(username, email, password);
};
