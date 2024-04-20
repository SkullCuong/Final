async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const nameInput = document.querySelector('input[name="name"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const emailInput = document.querySelector('input[name="email"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const confrimInput = document.querySelector('input[name="confrim"]');
  const dobInput = document.querySelector('input[name="dob"]');
  if (
    nameInput.value === '' ||
    passwordInput.value === '' ||
    emailInput.value === '' ||
    phoneInput.value === '' ||
    confrimInput.value === '' ||
    dobInput.value === ''
  ) {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (passwordInput.value !== confrimInput.value) {
    document.getElementById('error-message').innerText =
      'Password and Confirm must be same !!!';
    document.getElementById('error-message').style.display = 'block';
    return false;
  }
  try {
    const response = await axios
      .post(
        'http://localhost:3000/user/checkexist',
        { email: emailInput.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        return response.data.exist;
      });
    if (response) {
      document.getElementById('error-message').innerText = 'Email is used !!! ';
      document.getElementById('error-message').style.display = 'block';
    } else {
      document.getElementById('signUp').submit();
    }
  } catch (err) {
    alert(err);
    // window.location.href = 'http://localhost:3000/room/create';
  }
}
document.getElementById('signUp').addEventListener('submit', checkEmptyFields);
