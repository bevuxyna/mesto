import {Popup} from "./Popup";

export class PopupWithImage extends Popup{
    constructor(popupImageSelector) {
        super(popupImageSelector);
        this._popupPicture = this.popup.querySelector('.popup__picture');
        this._popupFigcaption = this.popup.querySelector('.popup__figcaption');
    }

    open (link, title) {
        this._popupPicture.src = link;
        this._popupPicture.alt = title;
        this._popupFigcaption.textContent = title;
        super.open();
    }
}