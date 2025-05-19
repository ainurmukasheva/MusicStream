document.addEventListener('DOMContentLoaded', function () {
  // Set Chart.js defaults for both themes
  Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-secondary');
  Chart.defaults.borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');

  // Update chart colors when theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      setTimeout(() => {
        Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-secondary');
        Chart.defaults.borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');

        // Redraw all charts
        Object.values(charts).forEach(chart => {
          chart.update();
        });
      }, 100);
    });
  }

  // Store chart instances
  const charts = {};

  // Top Genres Chart
  const genresCtx = document.getElementById('genresChart');
  if (genresCtx) {
    charts.genres = new Chart(genresCtx, {
      type: 'doughnut',
      data: {
        labels: [ 'Рок', 'Поп', 'Хип-хоп', 'Электронная', 'Инди', 'Другое' ],
        datasets: [ {
          data: [ 30, 25, 15, 12, 10, 8 ],
          backgroundColor: [
            '#1DB954', // Spotify green
            '#1ED760',
            '#2DE26D',
            '#4AE680',
            '#67E994',
            '#84EDA8'
          ],
          borderWidth: 0
        } ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              boxWidth: 12,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }

  // Listening Time by Day Chart
  const weekdayCtx = document.getElementById('weekdayChart');
  if (weekdayCtx) {
    charts.weekday = new Chart(weekdayCtx, {
      type: 'bar',
      data: {
        labels: [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ],
        datasets: [ {
          label: 'Часы',
          data: [ 2.5, 1.8, 2.2, 3.1, 4.2, 5.3, 4.8 ],
          backgroundColor: '#1DB954',
          borderRadius: 4
        } ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Часы'
            }
          }
        }
      }
    });
  }

  // Monthly Listening Hours Chart
  const monthlyCtx = document.getElementById('monthlyChart');
  if (monthlyCtx) {
    charts.monthly = new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
        datasets: [ {
          label: 'Часы',
          data: [ 45, 52, 48, 60, 72, 68, 74, 80, 85, 92, 88, 95 ],
          borderColor: '#1DB954',
          backgroundColor: 'rgba(29, 185, 84, 0.1)',
          tension: 0.3,
          fill: true
        } ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Часы'
            }
          }
        }
      }
    });
  }

  // Top Artists Chart
  const artistsCtx = document.getElementById('artistsChart');
  if (artistsCtx) {
    charts.artists = new Chart(artistsCtx, {
      type: 'bar',
      data: {
        labels: [ 'Цой', 'Oxxxymiron', 'Ёлка', 'SLYKT', 'bbno$' ],
        datasets: [ {
          label: 'Часы',
          data: [ 24, 18, 16, 12, 10 ],
          backgroundColor: [
            '#1DB954',
            '#1ED760',
            '#2DE26D',
            '#4AE680',
            '#67E994'
          ],
          borderRadius: 4
        } ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Часы'
            }
          }
        }
      }
    });
  }
});