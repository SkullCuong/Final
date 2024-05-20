async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const emailInput = document.querySelector('input[name="email"]');
  if (emailInput.value === '') {
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
    if (!response) {
      document.getElementById('error-message').innerText =
        'Email is not exist !!! ';
      document.getElementById('error-message').style.display = 'block';
    } else {
      document.getElementById('emailForget').submit();
    }
  } catch (err) {
    window.location.href = 'http://localhost:3000/home/err';
  }
}
document
  .getElementById('emailForget')
  .addEventListener('submit', checkEmptyFields);
