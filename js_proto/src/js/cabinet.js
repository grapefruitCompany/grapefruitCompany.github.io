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
      login = document.getElementById('login'),
      password = document.getElementById('password'),
      buttonLogin = document.getElementById('loginButton'),
      loginError = document.getElementById('loginError'),
      userName = document.getElementById('userName'),
      adminName = document.getElementById('adminName'),
      slides = document.querySelector('.slider__inner'),
      logOutUser = document.getElementById('logOutUser'),
      logOutAdmin = document.getElementById('logOutAdmin'),
      currentUser;

//console.log(buttons);

  checkLoginAndRole();

  buttonLogin.addEventListener('click', function(e){
    e.preventDefault();

    if (password.value === currentUser.password) {
      chooseSliderAndSetName(currentUser);
      loginError.innerHTML = '';
    } else {
      this.className = 'js__input--error';
      loginError.innerHTML = 'Error! Your password is wrong, try again.';
    }
    password.onfocus = function() {
      if (this.className == 'js__input--error') { // сбросить состояние "ошибка", если оно есть
        this.className = '';
        loginError.innerHTML = '';
        loginError.style.color = 'red';
      }
    };
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
    login.onblur = function() {
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

    login.onfocus = function() {
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