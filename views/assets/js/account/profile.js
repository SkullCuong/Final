async function checkEmptyFields(e) {
  e.preventDefault();
  // // Get references to input elements
  const phoneinput = document.querySelector('input[name="phone"]');
  const addressinput = document.querySelector('input[name="address"]');
  if (phoneinput.value === '' || addressinput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    document.getElementById('profile').submit();
  }
}
document.getElementById('profile').addEventListener('submit', checkEmptyFields);
