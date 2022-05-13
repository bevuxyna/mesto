import {Popup} from "./Popup";

export class PopupWithForm extends Popup{
    constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._buttonSubmit = this._form.querySelector('.popup__button-submit');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._handleSubmitForm(this._getInputValues());
            this._form.reset();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}