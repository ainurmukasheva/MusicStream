document.addEventListener('DOMContentLoaded', function () {
  // Burger menu
  const bodyLock = document.body;
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');

  burgerMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    bodyLock.classList.toggle('lock');
  });

  closeMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    bodyLock.classList.toggle('lock');
  });

  // Закрыть меню при клике вне его
  document.addEventListener('click', function (event) {
    if (!mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
      mobileMenu.classList.remove('active');
      bodyLock.classList.remove('lock');
    }
  });

  // Синхронизация имени пользователя между версиями
  const desktopUsername = document.getElementById('user-name');
  const mobileUsername = document.getElementById('mobile-user-name');

  if (desktopUsername.textContent) {
    mobileUsername.textContent = desktopUsername.textContent;
  }


  // Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle-buttons');
  const body = document.body;

  // Проверка сохранённой темы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggles.forEach(toggle => toggle.checked = true);
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggles.forEach(toggle => toggle.checked = false);
  }

  // Установка слушателей на все переключатели
  themeToggles.forEach(toggle => {
    toggle.addEventListener('change', function () {
      if (this.checked) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        themeToggles.forEach(t => t.checked = true); // синхронизация всех переключателей
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeToggles.forEach(t => t.checked = false); // синхронизация всех переключателей
      }
    });
  });

  // Создаем объект аудио для воспроизведения музыки
  const audioPlayer = new Audio();

  // Список треков (для примера)
  const tracks = [
    {
      title: "Summer Vibes",
      artist: "DJ Example",
      cover: "https://picsum.photos/seed/album1/160/160",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Rainy Days",
      artist: "The Coders",
      cover: "https://picsum.photos/seed/album2/160/160",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Night Drive",
      artist: "Web Developers",
      cover: "https://picsum.photos/seed/album3/160/160",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  // Текущий трек
  let currentTrackIndex = 0;

  // Обработчик для всех карточек альбомов
  document.querySelectorAll('.album-card').forEach((card, index) => {
    card.addEventListener('click', function () {
      // Проверяем, есть ли трек с таким индексом
      if (tracks[ index ]) {
        currentTrackIndex = index;
        loadAndPlayTrack(currentTrackIndex);
      } else {
        // Если нет, просто запускаем первый трек
        currentTrackIndex = 0;
        loadAndPlayTrack(currentTrackIndex);
      }
    });
  });

  // Функция для загрузки и воспроизведения трека
  function loadAndPlayTrack(index) {
    const track = tracks[ index ];

    // Обновляем информацию о треке
    const trackInfo = document.querySelector('.track-info');
    if (trackInfo) {
      trackInfo.querySelector('h4').textContent = track.title;
      trackInfo.querySelector('p').textContent = track.artist;
    }

    // Обновляем обложку
    const albumCover = document.querySelector('.now-playing img');
    if (albumCover) {
      albumCover.src = track.cover;
      albumCover.alt = `${track.title} by ${track.artist}`;
    }

    // Настраиваем и воспроизводим аудио
    audioPlayer.src = track.source;
    audioPlayer.load();
    audioPlayer.play();

    // Обновляем иконку плей/пауза
    const playButton = document.querySelector('.control-btn.play i');
    if (playButton) {
      playButton.classList.remove('fa-play');
      playButton.classList.add('fa-pause');
    }
  }

  // Обработчик события окончания трека
  audioPlayer.addEventListener('ended', function () {
    // Переходим к следующему треку
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadAndPlayTrack(currentTrackIndex);
  });

  // Обработчики для управления плеером
  const playButton = document.querySelector('.control-btn.play');
  const progressBar = document.querySelector('.progress');
  const volumeLevel = document.querySelector('.volume-level');
  const currentTimeDisplay = document.querySelector('.time.current');
  const totalTimeDisplay = document.querySelector('.time.total');

  // Функция форматирования времени
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  // Функция для преобразования времени из формата "m:ss" в секунды
  function convertTimeToSeconds(timeStr) {
    const [ minutes, seconds ] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  // Обработчик для кнопки play/pause
  if (playButton) {
    playButton.addEventListener('click', function () {
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        audioPlayer.play();
      } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        audioPlayer.pause();
      }
    });
  }

  // Обработчик кнопки следующего трека
  const nextButton = document.querySelector('.control-btn .fa-step-forward').parentElement;
  if (nextButton) {
    nextButton.addEventListener('click', function () {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      loadAndPlayTrack(currentTrackIndex);
    });
  }

  // Обработчик кнопки предыдущего трека
  const prevButton = document.querySelector('.control-btn .fa-step-backward').parentElement;
  if (prevButton) {
    prevButton.addEventListener('click', function () {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      loadAndPlayTrack(currentTrackIndex);
    });
  }

  // Обновление прогресс-бара
  audioPlayer.addEventListener('timeupdate', function () {
    if (progressBar) {
      const percent = audioPlayer.currentTime / audioPlayer.duration;
      progressBar.style.width = `${percent * 100}%`;

      // Обновляем текущее время
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
      }

      // Обновляем общее время
      if (totalTimeDisplay && !isNaN(audioPlayer.duration)) {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
      }
    }
  });

  // Обработчик клика по прогресс-бару
  if (progressBar) {
    const progressContainer = document.querySelector('.progress-bar');
    progressContainer.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;

      // Устанавливаем текущее время воспроизведения
      audioPlayer.currentTime = audioPlayer.duration * percent;

      // Обновляем прогресс-бар
      progressBar.style.width = `${percent * 100}%`;

      // Обновляем текущее время
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
      }
    });
  }

  // Обработчик уровня громкости
  if (volumeLevel) {
    const volumeBar = document.querySelector('.volume-bar');
    volumeBar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;

      // Устанавливаем уровень громкости (0-1)
      audioPlayer.volume = percent;

      // Обновляем визуальный индикатор громкости
      volumeLevel.style.width = `${percent * 100}%`;
    });
  }

  // Добавляем функционал для кнопки повтора
  const repeatButton = document.querySelector('.control-btn .fa-redo').parentElement;
  if (repeatButton) {
    repeatButton.addEventListener('click', function () {
      audioPlayer.loop = !audioPlayer.loop;
      this.classList.toggle('active');
    });
  }

  // Добавляем функционал для кнопки случайного воспроизведения
  const shuffleButton = document.querySelector('.control-btn .fa-random').parentElement;
  if (shuffleButton) {
    shuffleButton.addEventListener('click', function () {
      this.classList.toggle('active');
      // Логику перемешивания можно доработать при необходимости
    });
  }

  // Кнопка "Добавить в избранное"
  const favoriteButtons = document.querySelectorAll('.control-btn .fa-heart');
  favoriteButtons.forEach(icon => {
    const button = icon.parentElement;
    button.addEventListener('click', function () {
      const heartIcon = this.querySelector('.fa-heart');
      heartIcon.classList.toggle('far');
      heartIcon.classList.toggle('fas');
    });
  });


  // Загружаем первый трек по умолчанию, но не воспроизводим
  const track = tracks[ currentTrackIndex ];
  const trackInfo = document.querySelector('.track-info');
  if (trackInfo) {
    trackInfo.querySelector('h4').textContent = track.title;
    trackInfo.querySelector('p').textContent = track.artist;
  }

  const albumCover = document.querySelector('.now-playing img');
  if (albumCover) {
    albumCover.src = track.cover;
    albumCover.alt = `${track.title} by ${track.artist}`;
  }

  audioPlayer.src = track.source;
  audioPlayer.load();

  // Update sidebar links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' && link.textContent.includes('Liked Songs')) {
      link.setAttribute('href', 'liked-songs.html');
    }
  });

  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const userProfiles = document.querySelectorAll('.user-profile');
  const userData = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!userData || !userData.name) {
    userProfiles.forEach(function (userProfile) {
      userProfile.addEventListener('click', function () {
        window.location.href = 'auth.html';
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const userNameElement = document.getElementById('user-name');
  const mobileUserNameElement = document.getElementById('mobile-user-name');
  const userProfileElement = document.getElementById('user-profile');
  const userData = JSON.parse(localStorage.getItem('loggedInUser'));

  if (mobileUserNameElement && userData && userData.name) {
    mobileUserNameElement.textContent = userData.name;

    const logoutBtn = document.querySelector('.logout-btn');

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.reload();
    });
  }

  if (userData && userData.name) {
    userNameElement.textContent = userData.name;

    const logoutBtn = document.createElement('button');
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    logoutBtn.classList.add('logout-btn');

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.reload();
    });

    userProfileElement.appendChild(logoutBtn);
  }
});
