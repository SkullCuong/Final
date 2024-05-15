async function checkEmptyFields(e) {
  e.preventDefault();
  // // Get references to input elements
  const image = document.querySelector('input[name="image"]');
  if (image.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    document.getElementById('image').submit();
  }
}
document.getElementById('image').addEventListener('submit', checkEmptyFields);
