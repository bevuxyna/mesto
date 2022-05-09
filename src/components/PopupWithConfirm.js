import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._handleSubmit = this._submitEvent.bind(this);
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
        this._popupSelector('submit', this._handleSubmit);
        super.setEventListeners();
    }
}