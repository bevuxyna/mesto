import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._handleSubmit = this._submitEvent.bind(this);
        this._form = this._popupSelector.querySelector('.popup__form');
    }

    _submitEvent(evt) {
        evt.preventDefault();
        this._handleSubmit(this._data);
    }

    open(data) {
        this._data = data;
        super.open();
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._handleSubmit);
        super.setEventListeners();
    }
}