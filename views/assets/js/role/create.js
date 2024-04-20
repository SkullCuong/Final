async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const nameInput = document.querySelector('input[name="name"]');

  if (nameInput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  }
  try {
    const response = await axios
      .post(
        'http://localhost:3000/role/checkexist',
        { name: nameInput.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        return response.data.exist;
      });
    if (response) {
      document.getElementById('error-message').innerText = 'Role exists! ';
      document.getElementById('error-message').style.display = 'block';
    } else {
      document.getElementById('roomForm').submit();
    }
  } catch (err) {
    window.location.href = 'http://localhost:3000/room/create';
  }
}
document
  .getElementById('roleCreate')
  .addEventListener('submit', checkEmptyFields);
