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
  if (!formElement) return;
  const hasInvalid = Boolean(formElement.querySelector(`.${validation.config.inputErrorClass}`));
  const submitButton = formElement.querySelector(validation.config.submitButtonSelector);
  const isEmptyInput = Array.from(formElement.querySelectorAll('input')).some(input => !input.value.trim());
  submitButton.disabled = hasInvalid || isEmptyInput;
}

/**
 * @param {HTMLFormElement} formElement
 */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validation.config.inputSelector));
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
  if (!formElement){
    return;
  }
  const inputElements = Array.from(formElement.querySelectorAll(`.${validation.config.inputErrorClass}`));
  inputElements.forEach((element) => {
    hideInputError(formElement, element);
  });
  toggleButtonState(formElement);
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

export { clearValidation, toggleButtonState, enableValidation }
