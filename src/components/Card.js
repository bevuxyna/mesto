export class Card {
    constructor({data, userId, handleCardClick, handleDeleteClick, handleLikeCard}, cardTemplateSelector) {
        this._data = data;
        this._title = data.name;
        this._link = data.link;
        this._like = data.like;
        this._id = data._id;
        this._ownerId = data.ownerId;

        this._userId = userId;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeCard = handleLikeCard;

        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardTemplate;
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._buttonLike = this._cardElement.querySelector('.element__like-button');
        this._likesCount = this._cardElement.querySelector('.element__like-count');
        this._buttonDelete = this._cardElement.document.querySelector('.element__delete-button');

        this._setEventListeners();

        this._cardImage.title = this._cardElement.querySelector('.element__title').textContent = this._title;
        this._cardImage.src = this._cardImage.src = this._link;
        this._cardImage.alt = this._cardImage.alt = this._title;

        if (this._ownerId !== this._userId) {
            this._buttonDelete.style.display = 'none';
        }

        this. _hideDeleteButton();

        this.setLike(this._like);

        this._checkOwnLike();

        return this._cardElement;
    }

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _hideDeleteButton() {
        if (this._userId !== this._ownerId) {
            this._buttonDelete.remove();
        }
    }

    _setEventListeners() {
        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick();
        });

        this._buttonLike.addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._link);
        });
    }

    isLiked() {
        const isLikedCard = this._like.find(user => user._id === this._userId);
        return isLikedCard;
    }

    setLike() {
        this._like = data;
        this._likesCount.textContent = this._like.length;
    }

    addLike = () => {
        this._buttonLike.classList.add('element__like-button_active');
    }

    deleteLike = () => {
        this._buttonLike.classList.remove('element__like-button_active');
    }

    _checkOwnLike() {
        this.isLiked() ? this.addLike() : this.deleteLike();
    }
}






