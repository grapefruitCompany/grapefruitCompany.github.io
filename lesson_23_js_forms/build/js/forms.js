;(function(){
  var forms = document.querySelectorAll('.js__form');
  forms.forEach(
    function(form) {
      var inputs = form.querySelectorAll('input');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var result = [];

        inputs.forEach(function(input) {
          var errorMassage = {},
              valid = validation(errorMassage, input);
          if (valid) {
            result.push(true);
            input.classList.add('js__input--valid');
          } else {
            result.push(false);
            input.classList.add('js__input--invalid');
            if (input.type === 'checkbox') {
              var attrLabel = '[for=' + input.name + ']',
                  label = document.querySelector(attrLabel);
              label.style.border = '2px solid red';
            }
          } 
        });

        if (result.indexOf(false) < 0) {
          var formEventValid = new Event('formIsValid');
          form.dispatchEvent(formEventValid);
        } else {
          var formEventInvalid = new Event('formIsInvalid');
          form.dispatchEvent(formEventInvalid);
        }
      });

      form.addEventListener('formIsValid', function() {
        console.log('form Is Valid');
      });

      form.addEventListener('formIsInvalid', function() {
        console.log('form Is Invalid');
      });

      inputs.forEach(function(input) {
        var errorMassage = {},
            valid;

        input.addEventListener('change', function(e) {

          valid = validation(errorMassage, e.target);
          if (!valid) {
            if (e.target.classList.contains('js__input--invalid')) {
              createTooltip(errorMassage, e.target);
            }
            e.target.classList.remove('js__input--valid');
            e.target.classList.add('js__input--invalid');
          } else if (valid) {
            e.target.classList.add('js__input--valid');
            if (document.querySelector('.tooltip')) {
              document.querySelector('.tooltip').remove();
            }
          }

          if (e.target.type === 'checkbox') {
            specialForCheckBox(e.target);
          } 
        });

        input.addEventListener('focus', function(e) {

          valid = validation(errorMassage, e.target);
          
          if (e.target.classList.contains('js__input--invalid' || !valid) ) {
            createTooltip(errorMassage, e.target);
          }
          e.target.classList.remove('js__input--invalid');
        });

        input.addEventListener('blur', function(e) {
          valid = validation(errorMassage, e.target);
          if (!valid) {
            e.target.classList.add('js__input--invalid');
            e.target.classList.remove('js__input--valid');
          }
        });

        function specialForCheckBox(element) {
          var attrLabel = '[for=' + element.name + ']',
              label = document.querySelector(attrLabel);
          if (!element.checked) {
            label.style.border = '2px solid red';
            createTooltip(errorMassage, element);      
          } else {
            label.style.borderColor = 'transparent';
          }
        }
      });
      
      function createTooltip (obj, target) {
        if (document.querySelector('.tooltip')) {
          document.querySelector('.tooltip').remove();
        }

        var toolTipElement = document.createElement('div');
        toolTipElement.className = 'tooltip';
        document.body.appendChild(toolTipElement);

        for (var key in obj) {
          var massage = document.createElement('p');
          massage.className = '';
          massage.innerHTML = obj[key];
          toolTipElement.appendChild(massage);
        }

        if (target.type === 'checkbox') {
          var attrLabel = '[for=' + target.name + ']';
          target = document.querySelector(attrLabel);
        }

        var coords = target.getBoundingClientRect(),
            height = coords.bottom - coords.top;
        toolTipElement.style.left = coords.left + 15 + 'px';
        toolTipElement.style.top = (pageYOffset + coords.top - height - 20) + 'px';
      }



      function validation(error, target) {
        var result = [];

          if (target.required) {
            result.push(checkRequired(target));

            if (target.minLength > 0) {
              result.push(checkMinLength(target));  
            }
            if (target.maxLength > 0) {
              result.push(checkMaxLength(target));  
            }
            if (target.type === 'checkbox') {
              result.push(checkCheckBox(target));  
            }      
          }

          if (target.value.length > 0) {
            if (target.type === 'email') {
              result.push(checkEmailFormat(target));  
            }
            if (target.type === 'tel') {
              result.push(checkTelFormat(target));  
            }
          }
          
          
        function isNotSpace(symbol) {
          return (symbol !== ' ');
        }

        function checkRequired(innerObj) {
          var result = false;
          if ((innerObj.value.length > 0) && (innerObj.value.split('').some(isNotSpace))) {
            result = true;
          } else {
            error.required = 'Required field is empty!';
          }
          return result;
        }

        function checkMinLength(innerObj) {
          var result = false;
          if (innerObj.value.length >= innerObj.minLength) {
            result = true;
          } else {
            error.minLength = 'Length should be more than ' + innerObj.minLength;
          }
          return result;
        }

        function checkMaxLength(innerObj) {
          var result = false;
          if (innerObj.value.length <= innerObj.maxLength) {
            result = true;
          } else {
            error.maxLength += 'Length should be less than ' + innerObj.maxLength;
          }
          return result;
        }

        function checkEmailFormat(innerObj) {
          var result = false,
              r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              email = innerObj.value.toLowerCase();
          result = r.test(email);
          if (!result) {
            error.emailFormat = 'Wrong email format it should be like: email@domain.com';
          }
          return result;
        }

        function checkTelFormat(innerObj) {
          var result = false,
              r = /^((\+38|38|0)+([0-9]){9})$/gm,
              tel = innerObj.value.toLowerCase();
          result = r.test(tel);
          if (!result) {
            error.telFormat = 'Wrong phone format it should be like: +380971110011';
          }
          return result;
        }

        function checkCheckBox(innerObj) {
          var result = false;
          if (innerObj.required) {
            result = innerObj.checked;
          }

          if (!result) {
            error.checkbox = 'This field is required.';
          }
          return result;
        }

        return result.indexOf(false) < 0;
      }
    }
  );
}());