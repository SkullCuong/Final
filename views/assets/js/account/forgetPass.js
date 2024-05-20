async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const passwordInput = document.querySelector('input[name="password"]');

  const confrimInput = document.querySelector('input[name="repassword"]');

  if (confrimInput.value === '' || passwordInput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (passwordInput.value !== confrimInput.value) {
    document.getElementById('error-message').innerText =
      'Password and Confirm must be same !!!';
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    document.getElementById('forget').submit();
  }
}

document.getElementById('forget').addEventListener('submit', checkEmptyFields);
