async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const nameInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  if (nameInput.value === '' || passwordInput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    document.getElementById('login').submit();
  }
  //   try {
  //     const response = await axios
  //       .post(
  //         'http://localhost:3000/role/checkexist',
  //         { name: nameInput.value },
  //         { headers: { 'Content-Type': 'application/json' } }
  //       )
  //       .then(response => {
  //         return response.data.exist;
  //       });
  //     if (response) {
  //       document.getElementById('error-message').innerText = 'Role exists! ';
  //       document.getElementById('error-message').style.display = 'block';
  //     } else {
  //       document.getElementById('roomForm').submit();
  //     }
  //   } catch (err) {
  //     window.location.href = 'http://localhost:3000/room/create';
  //   }
}
document.getElementById('login').addEventListener('submit', checkEmptyFields);
