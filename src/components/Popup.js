export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => this._handleEscClose(event));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        });

    }
}