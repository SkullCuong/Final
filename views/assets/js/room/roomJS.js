async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const nameInput = document.querySelector('input[name="name"]');
  const typeInput = document.querySelector('input[name="type"]');
  const floorInput = document.querySelector('input[name="floor"]');
  const priceInput = document.querySelector('input[name="price"]');
  const capacityInput = document.querySelector('input[name="capacity"]');
  const imageInput = document.querySelector('input[name="image"]');
  if (
    nameInput.value === '' ||
    typeInput.value === '' ||
    floorInput.value === '' ||
    priceInput.value === '' ||
    capacityInput.value === '' ||
    imageInput.value === ''
  ) {
    document.getElementById('error-message').style.display = 'block';
    return false;
  }
  try {
    const response = await axios
      .post(
        'http://localhost:3000/room/checkexist',
        { name: nameInput.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        return response.data.exist;
      });
    if (response) {
      document.getElementById('error-message').innerText = 'Room exists! ';
      document.getElementById('error-message').style.display = 'block';
    } else {
      document.getElementById('roomForm').submit();
    }
  } catch (err) {
    window.location.href = 'http://localhost:3000/home/err';
  }
}
document
  .getElementById('roomForm')
  .addEventListener('submit', checkEmptyFields);
