async function checkUpdate(e) {
  e.preventDefault();
  // Get references to input elements
  const idInput = document.querySelector('input[name="id"]');
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
        { id: idInput.value, name: nameInput.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        return response.data.exist;
      });
    if (response) {
      document.getElementById('error-message').innerText = 'Room exists! ';
      document.getElementById('error-message').style.display = 'block';
    } else {
      document.getElementById('roomUpdate').submit();
    }
  } catch (err) {
    window.location.href = 'http://localhost:3000/room/create';
  }
}

document.getElementById('roomUpdate').addEventListener('submit', checkUpdate);
