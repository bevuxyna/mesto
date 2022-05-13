import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup{
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._setEvent = this._setEvent.bind(this);
    }

    handleSubmitConfirm(submitConfirm) {
        this._handleSubmit = submitConfirm;
    }

    _setEvent(evt) {
        evt.preventDefault();
        this._handleSubmit();
    }

    open() {
        super.open();
        this._popupSelector.addEventListener('submit', this._setEvent);
    }

    close() {
        super.close();
        this._popupSelector.removeEventListener('submit', this._setEvent);
    }

}