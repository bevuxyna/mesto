const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupPicture = popupOpenImage.querySelector('.popup__picture');
const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

import{openPopup} from './index.js';

export class Card {
    constructor(data,cardTemplateSelector) {
        this._title = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
    }

    _setEventListeners() {
        this._cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
            this._cardElement.remove();
        });

        this._buttonLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like-button_active');
        });

        this._cardImage.addEventListener('click', () => {
            popupPicture.src = this._link;
            popupPicture.alt = this._title;
            popupFigcaption.textContent = this._title;
            openPopup(popupOpenImage);
        });
    }

    createCard() {
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._buttonLike = this._cardElement.querySelector('.element__like-button');

        this._cardImage.title = this._cardElement.querySelector('.element__title').textContent = this._title;
        this._cardImage.src = this._cardImage.src = this._link;
        this._cardImage.alt = this._cardImage.alt = this._title;

        this._setEventListeners();

        return this._cardElement;
    }
}