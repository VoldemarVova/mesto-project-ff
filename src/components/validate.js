/**
 *
 * @type {{config: {
 *   formSelector: string,
 *   inputSelector: string,
 *   submitButtonSelector: string,
 *   inactiveButtonClass: string,
 *   inputErrorClass: string,
 *   errorClass: string
 * }}}
 */
const validation = {
  config: {},
}

const formElement = document.querySelector('.popup__form');

const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validation.config.inputErrorClass);
  formError.classList.add(validation.config.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validation.config.inputErrorClass);
  formError.classList.remove(validation.config.errorClass);
  formError.textContent = '';
};

const isValid = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage || '');
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

/**
 * @param {HTMLFormElement} formElement
 */
const toggleButtonState = (formElement) => {
  const hasInvalid = Boolean(formElement.querySelector(`.${validation.config.inputErrorClass}`));
  const submitButton = formElement.querySelector(validation.config.submitButtonSelector);
  submitButton.disabled = hasInvalid;
}

/**
 * @param {HTMLFormElement} formElement
 */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validation.config.inputSelector));
  const buttonElement = formElement.querySelector(validation.config.submitButtonSelector);
  toggleButtonState(formElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', function () {
      isValid(formElement, formInput);
      toggleButtonState(formElement);
    });
  });
};

/**
 * @param {HTMLFormElement} formElement
 */
function clearValidation(formElement) {
  console.log('`.${validation.config.errorClass}`', `.${validation.config.errorClass}`)
  const errorMessageElements = Array.from(formElement.querySelectorAll(`.${validation.config.errorClass}`));
  console.log('errorMessageElements', errorMessageElements);
  errorMessageElements.forEach((element) => {
    element.textContent = '';
    element.classList.remove(validation.config.errorClass);
  });
  const inputElements = Array.from(formElement.querySelectorAll(`.${validation.config.inputErrorClass}`));
  console.log('inputElements', inputElements);
  inputElements.forEach((element) => {
    element.classList.remove(validation.config.inputErrorClass);
  });
}

/**
 * @param validationConfig {{
 *   formSelector: string,
 *   inputSelector: string,
 *   submitButtonSelector: string,
 *   inactiveButtonClass: string,
 *   inputErrorClass: string,
 *   errorClass: string
 * }}
 */
const enableValidation = (validationConfig) => {
  validation.config = { ...validationConfig };
  const formList = Array.from(document.querySelectorAll(validation.config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// const formInput = formElement.querySelector('.popup__input');
// formInput.addEventListener('input', function (event) {
//   console.log(event.target.validity.valid);
// });

export { clearValidation, toggleButtonState, enableValidation}
