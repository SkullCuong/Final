document.addEventListener('DOMContentLoaded', function () {
  // Select all submit buttons
  const buttons = document.querySelectorAll('.submit-btn');
  console.log(buttons);
  buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById('error-message').style.display = 'none';
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const form = button.closest('form');
      console.log(form);
      const checkInValue = new Date(button.getAttribute('data-checkin'));
      checkInValue.setHours(0, 0, 0, 0);
      console.log(checkInValue);
      if (checkInValue > today) {
        const confirmation = confirm(
          'Are you sure you want to cancel the order ?'
        );
        if (confirmation) {
          alert('Cancel Success !!!');
          form.submit();
        }
      } else {
        document.getElementById('error-message').style.display = 'block';
      }
    });
  });
});
