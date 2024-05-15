async function checkEmptyFields(e) {
  e.preventDefault();
  // // Get references to input elements
  const passwordInput = document.querySelector('input[name="password"]');
  const newPasswordInput = document.querySelector('input[name="newPassword"]');
  const confirmPasswordInput = document.querySelector('input[name="confirm"]');
  const nameInput = document.querySelector('input[name="email"]');
  console.log(nameInput.value);
  if (
    newPasswordInput.value === '' ||
    passwordInput.value === '' ||
    confirmPasswordInput.value === ''
  ) {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (newPasswordInput.value !== confirmPasswordInput.value) {
    document.getElementById('error-message').innerText =
      'Password and Confirm must be same !!!';
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    // Validate the email and password
    const isValidAccount = await isValid(nameInput.value, passwordInput.value);
    if (!isValidAccount) {
      document.getElementById('error-message').innerText =
        'password is not valid !!!';
      document.getElementById('error-message').style.display = 'block';
      return false;
    } else {
      document.getElementById('password').submit();
    }
  }
}
async function isValid(email, password) {
  try {
    const response = await axios.post(
      'http://localhost:3000/user/isvalid',
      { email: email, password: password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.valid;
  } catch (err) {
    window.location.href = 'http://localhost:3000/room/create';
  }
}
document
  .getElementById('password')
  .addEventListener('submit', checkEmptyFields);
