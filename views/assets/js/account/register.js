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
  } else if (!isAgeValid(dobInput.value)) {
    document.getElementById('error-message').innerText =
      'Age must in range from 16 to 100';
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
    window.location.href = 'http://localhost:3000/home/err';
  }
}
function isAgeValid(dob, minAge = 16, maxAge = 100) {
  // Parse the date of birth
  const birthDate = new Date(dob);

  // Get today's date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthdate has not occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  // Check if the age is within the valid range
  return age >= minAge && age < maxAge;
}
document.getElementById('signUp').addEventListener('submit', checkEmptyFields);
