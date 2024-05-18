async function checkEmptyFields(e) {
  e.preventDefault();
  // // Get references to input elements
  const nameInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  if (nameInput.value === '' || passwordInput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    // Validate the email and password
    const { valid, isActive } = await isValid(
      nameInput.value,
      passwordInput.value
    );
    if (!valid) {
      document.getElementById('error-message').innerText =
        'Account is not valid !!!';
      document.getElementById('error-message').style.display = 'block';
      return false;
    } else {
      if (!isActive) {
        document.getElementById('error-message').innerText =
          'Please active your account by clicking the link in your email';
        document.getElementById('error-message').style.display = 'block';
        return false;
      } else {
        document.getElementById('login').submit();
      }
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
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
document.getElementById('login').addEventListener('submit', checkEmptyFields);
