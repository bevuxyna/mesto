export class Card {
    constructor({data, handleCardClick, handleDeleteClick, handleLikeCard}, cardTemplateSelector) {
        this._title = data.name;
        this._link = data.link;
        this._like = data.like;
        this._userId = data.userId;
        this._id = data.id;
        this._ownerId = data.ownerId;

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

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {
        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick();
        });

        this._buttonLike.addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    isLiked() {
        const isLikedCard = this._like.find(user => user._id === this._userId)
        return isLikedCard
    }

    setLike() {
        this._like = currentLike;
        this._likesCount.textContent = this._like.length;

        if (this.isLiked()) {
            this.addLike();
        } else {
            this.deleteLike();
        }
    }

    addLike = () => {
        this._buttonLike.classList.add('element__like-button_active');
    }

    deleteLike = () => {
        this._buttonLike.classList.remove('element__like-button_active');
    }


    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._buttonLike = this._cardElement.querySelector('.element__like-button');
        this._likesCount = this._cardElement.querySelector('.element__like-count');
        this._buttonDelete = document.querySelector('.element__delete-button');

        this._setEventListeners();

        this._cardImage.title = this._cardElement.querySelector('.element__title').textContent = this._title;
        this._cardImage.src = this._cardImage.src = this._link;
        this._cardImage.alt = this._cardImage.alt = this._title;

        if (this._ownerId !== this._userId) {
            this._buttonDelete.style.display = 'none';
        }

        this.setLike(this._like);

        return this._cardElement;
    }
}






