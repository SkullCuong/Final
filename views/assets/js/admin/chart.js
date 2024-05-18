document.addEventListener('DOMContentLoaded', function () {
  // Retrieve data from the server
  const labels = JSON.stringify(labels);
  const data = JSON.stringify(data);
  console.log(labels, data);
  // Generate chart using Chart.js
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '# of Bookings',
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
