class FormValidator {
    constructor(validationSettings, formElement) {
        this._formElement = formElement;
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._submitButtonDisabled = validationSettings.submitButtonDisabled;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;

    }

    //Показать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

//Спрятать ошибку
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //Проверка валидности input
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    //Проверка, есть ли хотя бы одно поле, которое не прошло валидацию
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _disableSubmitButton(buttonElement) {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._submitButtonDisabled);
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._submitButtonDisabled);
    }

    //Блокировка кнопки «Отправить»
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}