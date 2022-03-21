//Включение валидации всех форм.
// Функция принимает как объект настроек все нужные функциям классы и селекторы элементов
validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    submitButtonDisabled: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

//Спрятать ошибку
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

//Проверка валидности input
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};

//Проверка, есть ли хотя бы одно поле, которое не прошло валидацию
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//Блокировку кнопки «Отправить»
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationSettings.submitButtonDisabled);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationSettings.submitButtonDisabled);
    }
};

//Установка слушателей событий на список всех input
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings)
            toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};

//Валидация формы
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
    });
};

enableValidation(validationSettings);
