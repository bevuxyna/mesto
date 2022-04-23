export class Card {
    constructor({data, handleCardClick},cardTemplateSelector) {
        this._title = data.name;
        this._link = data.link;
        this.handleCardClick = handleCardClick;
        this._cardTemplateSelector = cardTemplateSelector;
        this._cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.element');
    }

    _handleLikeButton = () => {
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {
        //Удаление карточки
        this._cardElement.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);

        //Активная кнопка лайка
        this._buttonLike.addEventListener('click', this._handleLikeButton);

        //Открытие изображения места
        this._cardImage.addEventListener('click', () => {
            this.handleCardClick();
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