var counter1 = makeCounter();
var counter2 = makeCounter();

console.log('First count, counter1: ' + counter1());
console.log('Second count, counter1: ' + counter1());
console.log('Third count, counter1: ' + counter1());

console.log('First count, counter2: ' + counter2(7));
console.log('Second count, counter2: ' + counter2());
console.log('Third count, counter2: ' + counter2());

var comparePassword = storagePassword('Qwerty$uch789');

console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('Qwerty$uch789'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('QwertySuch123'));
console.log(comparePassword('Qwerty$uch789'));
console.log(comparePassword('QwertySuch123'));

var multi3 = multiA(3);
var multi4 = multiA(4);

console.log('multiA(3)(4) ' + multiA(3)(4) + ' multi3(1) ' + multi3(1) + ' multi4(2) ' + multi4(2));
console.log('multiA(5)(1) ' + multiA(5)(1) + ' multi3(3) ' + multi3(3) + ' multi4(1) ' + multi4(1));

var count1 = makeObjCounter();
var count2 = makeObjCounter2();

console.log('First count, count1: ' + count1.get());
console.log('Second count, count1: ' + count1.get());
console.log('Third count, count1: ' + count1.get());
console.log('Reset count, count1: ' + count1.reset() + ' ' + count1.get());

console.log('First count, count2: ' + count2());
console.log('Second count, count2: ' + count2());
console.log('Set count, count2: ' + count2.set(9));
console.log('Third count, count2: ' + count2());
console.log('Last count, count2: ' + count2());

var form = {
  name: {
    value: 'Masha',
    validationRules: {
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    errorMessage: '',
  },
  email: {
    value: 'ema.il@dom@ain.com',
    validationRules: {
      email: true,
      required: true,
    },
    errorMessage: '',
  },
  adress: {
    value: 'Abanov street',
    validationRules: {
      minLength: 3,
      maxLength: 20,
      required: false,
    },
    errorMessage: '',
  },
};

console.log('Validation form result: ' + validation(form));

function makeCounter() {
  var number = 0;
  return function(n) {
    n = n || 0;
    number += n;
    return number++;
  };
}

function storagePassword(password) {
  var conuterAttempts = 0;
  return function validatePassword(str) {
    console.log('password ' + password + ' checking password ' + str + ' counter attempts ' + conuterAttempts);    
    
    if (password === str) {
      conuterAttempts = 0;
      return true;  
    } else {
      if (conuterAttempts > 5) {
        console.log('WARNING! You better to recall your password or you will face consequences!');
      }
      conuterAttempts++;
      return false;  
    }
  };
}

function multiA(a) {
  return function(b) {
    return a * b;
  };
}

function makeObjCounter() {
  var number = 0;
  return {
    get: function() {
      return number++;
    },
    reset: function() {
      number = 0;
    },
    set: function(x) {
      number = x;
    }
  };
}

function makeObjCounter2() {
  var number = 0;
  function count() {
    return number++;
  }
  count.set = function(x) {
    number = x;
  };
  count.reset = function() {
      number = 0;
  };
  return count; 
}

(function(food) {
  if (food === 'cookies') {
    console.log('More please :)');
  } else {
    console.log('Some food please :)');
  }
})('cookies');

var foodChecking = function(food) {
  if (food === 'cookies') {
    console.log('More please :)');
  } else {
    console.log('Some food please :)');
  }
};

foodChecking('not cookies');
foodChecking('cookies');

function validation(obj) {
  var result = [];

  for (var key in obj) {
    if (obj[key].validationRules.required) {
      result.push(checkRequiredField(obj[key]));  
    }
    if (obj[key].validationRules.minLength > 0) {
      result.push(checkMinLength(obj[key]));  
    }
    if (obj[key].validationRules.maxLength > 0) {
      result.push(checkMaxLength(obj[key]));  
    }
    if (obj[key].validationRules.email) {
      result.push(checkEmailFormat(obj[key]));  
    }
  }

  function isNotSpace(symbol) {
    return (symbol !== ' ');
  }

  function checkRequiredField(innerObj) {
    var result = false;
    if ((innerObj.value.length > 0) && (innerObj.value.split('').some(isNotSpace))) {
      result = true;
    } else {
      innerObj.errorMessage = 'ERROR: Required field is empty!';
    }
    return result;
  }

  function checkMinLength(innerObj) {
    var result = false;
    if (innerObj.value.length >= innerObj.validationRules.minLength) {
      result = true;
    } else {
      innerObj.errorMessage = 'ERROR: length of string should be longer than ' + innerObj.validationRules.minLength;
    }
    return result;
  }

  function checkMaxLength(innerObj) {
    var result = false;
    if (innerObj.value.length <= innerObj.validationRules.maxLength) {
      result = true;
    } else {
      innerObj.errorMessage = 'ERROR: length of string should be less than ' + innerObj.validationRules.maxLength;
    }
    return result;
  }

  function checkEmailFormat(innerObj) {
    var result = false;
    var email = innerObj.value;
    if ((email.indexOf('@') >= 0) && (email.indexOf('.') >= 0)) {
      var atSignIndex = email.indexOf('@');
      if (email.indexOf('@', atSignIndex) < 0) {
        if ((atSignIndex >= 1) && ((atSignIndex + 1) < email.indexOf('.', atSignIndex)) && (email.indexOf('.', atSignIndex) < --email.length)) {
        result = true;
        }  
      }
    }
    if (!result) {
      innerObj.errorMessage = 'ERROR: wrong email format it should be like: email@domain.com';
    }
    return result;
  }

  console.log(obj);
  return result.indexOf(false) < 0;
}
