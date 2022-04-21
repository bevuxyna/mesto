export class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => this._handleEscClose(event));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        });
    }
}