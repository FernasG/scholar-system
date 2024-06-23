const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const passwordErrorMessage = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
const usernameErrorMessage = 'O nome de usuário deve ter pelo menos 10 caracteres.';
const confirmPasswordErrorMessage = 'As senhas não coincidem.';

const getProfileVariables = () => {
  const usernameElement = document.getElementById('username');
  const currentPasswordElement = document.getElementById('currentPassword');
  const newPasswordElement = document.getElementById('newPassword');
  const confirmNewPasswordElement = document.getElementById('confirmNewPassword');

  const username = usernameElement.value;
  const currentPassword = currentPasswordElement.value;
  const newPassword = newPasswordElement.value;
  const confirmNewPassword = confirmNewPasswordElement.value;

  return { username, currentPassword, newPassword, confirmNewPassword };
};

const checkProfileVariables = (username, currentPassword, newPassword, confirmNewPassword) => {
  const usernameError = document.getElementById('username-error');
  const currentPasswordError = document.getElementById('currentPassword-error');
  const newPasswordError = document.getElementById('newPassword-error');
  const confirmNewPasswordError = document.getElementById('confirmNewPassword-error');
  let checkResult = true;

  if (!username || username.length < 10) {
    usernameError.textContent = usernameErrorMessage;
    checkResult = false;
  } else {
    usernameError.textContent = '';
  }

  if (!currentPassword) {
    currentPasswordError.textContent = 'A senha atual é obrigatória.';
    checkResult = false;
  } else {
    currentPasswordError.textContent = '';
  }

  if (!newPassword || !passwordRegex.test(newPassword)) {
    newPasswordError.textContent = passwordErrorMessage;
    checkResult = false;
  } else {
    newPasswordError.textContent = '';
  }

  if (newPassword !== confirmNewPassword) {
    confirmNewPasswordError.textContent = confirmPasswordErrorMessage;
    checkResult = false;
  } else {
    confirmNewPasswordError.textContent = '';
  }

  return checkResult;
};

const handleProfileError = async ({ response: { data: { message } } }) => {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove('d-none');

  await new Promise(resolve => setTimeout(resolve, 3000));

  errorMessageElement.classList.add('d-none');

  return null;
};

const displayProfileSuccessMessage = async () => {
  const successMessageElement = document.getElementById('success-message');
  successMessageElement.textContent = 'Perfil atualizado com sucesso!';
  successMessageElement.classList.remove('d-none');

  await new Promise(resolve => setTimeout(resolve, 3000));

  successMessageElement.classList.add('d-none');
};

const profileRequest = async (username, currentPassword, newPassword) => {
  const response = await axios
    .put('/api/users/profile', { username, currentPassword, newPassword })
    .then(({ data }) => data)
    .catch(handleProfileError);

  if (!response) return null;

  await displayProfileSuccessMessage();
};

const submitProfileForm = async (event) => {
  event.preventDefault();

  const { username, currentPassword, newPassword, confirmNewPassword } = getProfileVariables();

  if (!checkProfileVariables(username, currentPassword, newPassword, confirmNewPassword)) return;

  await profileRequest(username, currentPassword, newPassword);
};

document.getElementById('profileForm').addEventListener('submit', submitProfileForm);
