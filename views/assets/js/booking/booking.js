async function checkEmptyFields(e) {
  e.preventDefault();
  // Get references to input elements
  const idInput = document.querySelector('input[name="roomId"]').value;
  const checkInInput = document.querySelector('input[name="checkIn"]');
  const checkOutInput = document.querySelector('input[name="checkout"]');
  if (checkInInput.value === '' || checkOutInput.value === '') {
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (!checkDate(checkInInput.value)) {
    document.getElementById('error-message').innerText =
      'Check-In must be greater or equal today';
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (!check(checkInInput.value, checkOutInput.value)) {
    document.getElementById('error-message').innerText =
      'Check-Out must be greater than Check-In';
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else {
    const result = await valid(
      idInput,
      checkInInput.value,
      checkOutInput.value
    );
    if (result) {
      document.getElementById('error-message').innerText = 'Room is booked !!!';
      document.getElementById('error-message').style.display = 'block';
      return false;
    } else {
      document.getElementById('bookingForm').submit();
    }
  }
}

function checkDate(date) {
  const now = new Date();
  const inputDate = new Date(date);
  now.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate >= now;
}
function check(checkIn, checkOut) {
  const dateIn = new Date(checkIn);
  const dateOut = new Date(checkOut);
  return dateOut > dateIn;
}

async function valid(id, checkIn, checkout) {
  try {
    const response = await axios.post(
      'http://localhost:3000/booking/checkdate',
      { id: id, checkIn: checkIn, checkout: checkout },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.valid;
  } catch (err) {
    console.log(err);
  }
}
document
  .getElementById('bookingForm')
  .addEventListener('submit', checkEmptyFields);
