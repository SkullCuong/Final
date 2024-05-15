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
    const isValidAccount = await isValid(nameInput.value, passwordInput.value);
    if (!isValidAccount) {
      document.getElementById('error-message').innerText =
        'Account is not valid !!!';
      document.getElementById('error-message').style.display = 'block';
      return false;
    } else {
      // Uncomment the line below if you want to submit the form after validation
      document.getElementById('login').submit();
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
document.getElementById('login').addEventListener('submit', checkEmptyFields);
