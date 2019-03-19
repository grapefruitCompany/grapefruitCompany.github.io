// => SignUpForm проверка паролей готова, дальше нужно получить ответ формы при нажатии на кнопку
// => ответ формі будет нашим новім аккаунтом юзера
// => добавить проверку что логин должен біть не занят

// Зробіть форму для сайнапу (реєстрація нового користувача) 
// з полями ім'я, пароль, повторити пароль, чекбокс "адміністратор". 
// Ім'я і пароль є обов'язковими. 
// Пароль і повторити пароль повинні співпадати.

// Успішний сайнап одразу створює нового користувача відповідної ролі і логінить його в систему. 
// (Врахуйте, що при перезавантаженні сторінки щойно створений користувач зникне. Якщо він вам потрібен - 
// додайте його дані в колекцію користувачів вручну).

// Реалізуйте роботу системи таким чином, щоб дані про залогіненого користувача 
// не зникали при перезавантаженні сторінки. 
// Для цього використайте https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage 
// або https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

// Якщо ніхто не залогінений, на екрані видно одразу 2 форми - логін і сайнап. 
// Якщо користувач залогінений - відповідні для його ролі кнопки.

;(function () {
  var usersList = {}; // в этот объект мы вписываем всех юзеров, их имя и пароль
  var generateUniqueId = counter();

  Guest.prototype = user;
  Admin.prototype = user;

  var guestFirst = new Guest('Aaa', '123456'),
      guestSecond = new Guest('Bbb', '123456'),
      adminFirst = new Admin('Ccc', '123456789'),
      // login = document.getElementById('login'),
      // password = document.getElementById('password'),
      // buttonLogin = document.getElementById('loginButton'),
      loginError = document.getElementById('loginError'),
      userName = document.getElementById('userName'),
      adminName = document.getElementById('adminName'),
      slides = document.querySelector('.slider__inner'),
      logOutUser = document.getElementById('logOutUser'),
      logOutAdmin = document.getElementById('logOutAdmin'),
      currentUser;

  var loginForm = {
    login: document.getElementById('login'),
    password: document.getElementById('password'),
    buttonLogin: document.getElementById('loginButton'),
  }

  var signUpForm = {
    loginNew: document.getElementById('loginNew'),
    passwordNew: document.getElementById('passNew'),
    passwordCheck: document.getElementById('passCheck'),
    isAdmin: document.getElementById('isAdmin'),
    buttonSignUp: document.getElementById('signUpButton')
  }

  checkLoginAndRole();

  loginForm.buttonLogin.addEventListener('click', function(e){
    e.preventDefault();
    if (loginForm.password.value === currentUser.password) {
      chooseSliderAndSetName(currentUser);
      loginError.innerHTML = '';
    } else {
      this.classList.add('js__input--error');
      loginError.innerHTML = 'Error! Your password is wrong, try again.';
    }
  });

  loginForm.password.addEventListener('focus', function(){
    if (loginForm.buttonLogin.classList.contains('js__input--error')) { // сбросить состояние "ошибка", если оно есть
      loginForm.buttonLogin.classList.remove('js__input--error');
      loginError.innerHTML = '';
      loginError.style.color = 'red';
    }
  });

  signUpForm.passwordNew.addEventListener('blur', function() {
    if ((this.value.length >= 6)) {
      this.classList.remove('js__input--error');
      signUpForm.passwordCheck.disabled = false;
      loginError.innerHTML = '';
    } else {
      this.classList.add('js__input--error');
      signUpForm.passwordCheck.disabled = true;
      loginError.innerHTML = 'Error! Length or your password should be from 6 and till 12 symbols';
    }
  });

  signUpForm.passwordCheck.addEventListener('blur', function() {
    if (this.value === signUpForm.passwordNew.value) {
      this.classList.remove('js__input--error');
      signUpForm.passwordNew.classList.remove('js__input--error');
      loginError.innerHTML = '';
    } else {
      this.classList.add('js__input--error');
      signUpForm.passwordNew.classList.add('js__input--error');
      loginError.innerHTML = 'Error! Your password is not equal.';
    }
  });

  logOutUser.addEventListener('click', logOut);
  logOutAdmin.addEventListener('click', logOut);

  function logOut(e) {
    e.preventDefault();
    currentUser = {};
    slides.classList.remove('js__slider__inner--0');
    slides.classList.remove('js__slider__inner--2');
    slides.classList.add('js__slider__inner--1');
  }

  function chooseSliderAndSetName(obj) {
    if (obj.role === 'guest') {
      userName.innerHTML = obj.name;
      slides.classList.remove('js__slider__inner--2');
      slides.classList.remove('js__slider__inner--1');
      slides.classList.add('js__slider__inner--0');
    } else if (obj.role === 'admin') {
      adminName.innerHTML = obj.name;
      slides.classList.remove('js__slider__inner--1');
      slides.classList.remove('js__slider__inner--0');
      slides.classList.add('js__slider__inner--2');
    } else {
      loginError.innerHTML = 'Some mistake occured. Please, contact to support.';
      console.log(obj.name, obj.role);
    }
  }

  function checkLoginAndRole() {
    loginForm.login.onblur = function() {
      var result = false;
      for (var key in usersList) {
        if (this.value === usersList[key].name) {
          result = true;
          currentUser = usersList[key];
          break;
        } 
      }

      if (result) {
        this.className = 'js__input--success';
      } else {
        this.className = 'js__input--error';
        loginError.innerHTML = 'Error! Your login is wrong, try again.';
      }
    };

    loginForm.login.onfocus = function() {
      if (this.className == 'js__input--error') { // сбросить состояние "ошибка", если оно есть
        this.className = '';
        loginError.innerHTML = '';
        loginError.style.color = 'red';
      }
    };
  }

  var news = {
    0: 'Mate Academy',
    1: 'Sergey found job',
    2: 'His new job is FrontEnd Developer',
  };

  var user = {
    showNews: function() {
      for (var key in news) {
        console.log(news[key]);
      }
    },
    setName: function(str) {
      this.name = str;
      console.log('Your new name is ' + this.name);
    },
    setPassword: function(str) {
      this.password = str;
      console.log('Your new password is ' + this.password);
    },
  };

  function userValidation(name, password) {
    return usersList[name] === password;
  }

  function addUserToLIst(id, obj) {
    usersList[id] = obj;
  }

  function Admin(name, password) {
    this.id = generateUniqueId();
    this.name = name;
    this.password = password;
    this.role = 'admin';
    addUserToLIst(this.id, this);

    this.addNews = function(str) {
      var keys = [];
      for (var key in news) {
        keys.push(key);
      }
      news[keys.length] = str;
    };

    this.removeNews = function(key) {
      delete news[key];
    };
  }

  function Guest(name, password) {
    this.id = generateUniqueId();
    this.name = name;
    this.password = password;
    this.role = 'guest';
    addUserToLIst(this.id, this);
  }

  function counter() {
    var currentCount = 1;
    return function() {
      return currentCount++;
    };
  }
  
}());