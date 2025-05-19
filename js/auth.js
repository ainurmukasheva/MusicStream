document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  const switchTabButtons = document.querySelectorAll('.switch-tab');

  function switchTab(tabName) {
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    forms.forEach(form => {
      form.classList.toggle('active', form.classList.contains(`${tabName}-form`));
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  switchTabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Регистрация
  const signupForm = document.querySelector('.signup-form form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();
      const name = document.getElementById('signup-name').value.trim();
      const agreed = document.getElementById('terms').checked;

      if (!email || !password || !name || !agreed) {
        alert('Пожалуйста, заполните все поля и примите условия');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '{}');

      if (users[ email ]) {
        alert('Пользователь с такой почтой уже существует');
        return;
      }

      users[ email ] = { password, name };
      localStorage.setItem('users', JSON.stringify(users));

      alert('Регистрация успешна. Можете войти');
      switchTab('login');
    });
  }

  // Авторизация
  const loginForm = document.querySelector('.login-form form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      const users = JSON.parse(localStorage.getItem('users') || '{}');

      if (!email || !password) {
        alert('Введите email и пароль');
        return;
      }

      const user = users[ email ];

      if (!user || user.password !== password) {
        alert('Неверный email или пароль');
        return;
      }

      localStorage.setItem('loggedInUser', JSON.stringify({ email, name: user.name }));

      window.location.href = 'index.html';
    });
  }

  // На главной странице (index.html)
  const logoutBtn = document.getElementById('logout-btn');
  const welcomeUser = document.getElementById('welcome-user');

  if (logoutBtn && welcomeUser) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
      welcomeUser.textContent = `Добро пожаловать, ${loggedInUser.name}`;
    } else {
      welcomeUser.textContent = `Вы не вошли в систему`;
      logoutBtn.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      location.reload();
    });
  }
});

