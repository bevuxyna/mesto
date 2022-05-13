import './index.css';

import {apiOptions} from "../utils/constants";
import {Api} from "../components/Api";
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from "../components/Section";
import {PopupWithForm} from "../components/PopupWithForm";
import {PopupWithImage} from "../components/PopupWithImage";
import {UserInfo} from "../components/UserInfo";
import {
    popupEdit,
    popupAdd, popupEditAvatar, popupOpenImage, popupConfirmDelete,
    buttonEditProfile, buttonAddCard, buttonEditAvatar,
    nameInput,
    aboutInput, cardTemplate, placeElement, validationSettings
} from '../utils/constants.js';
import {PopupWithConfirm} from "../components/PopupWithConfirm";


const profileValidator = new FormValidator(validationSettings, popupEdit);
const addCardValidator = new FormValidator(validationSettings, popupAdd);
const avatarValidator = new FormValidator(validationSettings, popupEditAvatar);
profileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();


const api = new Api(apiOptions);

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData._id;

        profile.setUserInfo(userData);
        profile.setUserAvatar(userData);

        initialCards.reverse();
        cards.renderItems(initialCards);
        }
    )
    .catch((err) => {
        console.log(err);
    })


const cards = new Section({
    items: [],
    renderer: (items) => {
        const card = createNewCard(items);
        cards.addItem(card);
    }
}, placeElement);



//Экземпляр профиля
const profile = new UserInfo({
    profileName: '.profile__author',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar'
});

//Экземпляр формы редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, {
    handleSubmitForm: (data) => {
        popupEditProfile.renderLoading(true);
        api.updateUserInfo(data)
            .then((res) => {
                profile.setUserInfo(res);
                popupEditProfile.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfile.renderLoading(false);
            })
    }
});

//Заполнение полей формы редактирования профиля
function editProfile() {
    const userData = profile.getUserInfo();
    nameInput.value = userData.userName;
    aboutInput.value = userData.userInfo;
}

popupEditProfile.setEventListeners();

//Открытие формы редактирования
buttonEditProfile.addEventListener('click', function () {
    editProfile();
    popupEditProfile.open();
    profileValidator.toggleButtonState();
    profileValidator.resetValidation();
});



//Экземпляр формы редактирования аватара
const popupEditNewAvatar = new PopupWithForm(popupEditAvatar, {
    handleSubmitForm: (data) => {
        popupEditNewAvatar.renderLoading(true);
        api.updateAvatar(data)
            .then((res) => {
                profile.setUserAvatar(res);
                popupEditNewAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditNewAvatar.renderLoading(false);
            })
    }
});

popupEditNewAvatar.setEventListeners();

//Открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
    popupEditNewAvatar.open();
    avatarValidator.toggleButtonState();
    avatarValidator.resetValidation();
});




//Экземпляр формы добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, {
    handleSubmitForm: (data) => {
        popupAddCard.renderLoading(true);
        api.sendCard(data)
            .then((data) => {
                const card = createNewCard(data);
                cards.addItem(card);
                popupAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddCard.renderLoading(false);
            })
    }
});

popupAddCard.setEventListeners();

//Открытие формы добавления карточки
buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    addCardValidator.toggleButtonState();
    addCardValidator.resetValidation();
});


//Экземпляр попапа подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirm(popupConfirmDelete, {
    handleSubmit: (data) => {
        api.deleteCard(data)
            .then(() => {
                popupDeleteCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

popupDeleteCard.setEventListeners();



//Экземпляр попапа просмотра картинки
const popupOpenPicture = new PopupWithImage(popupOpenImage);

popupOpenPicture.setEventListeners();

const createNewCard = (data) => {
    const card = new Card({
            data, userId,
        handleCardClick: () => {
            popupOpenPicture.open(data.name, data.link);
            },

            handleDeleteClick: () => {
                popupDeleteCard.open();
                popupDeleteCard.handleSubmitConfirm(() => {
                    api.deleteCard(card._id)
                        .then(() => {
                            card.deleteCard();
                            popupDeleteCard.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
            },

        handleLikeCard: () => {
            if (card.isLiked()) {
                api.deleteLike(card._id)
                    .then((data) => {
                        card.deleteLike();
                        card.setLike(data.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            } else {
                api.setLike(card._id)
                    .then((data) => {
                        card.addLike();
                        card.setLike(data.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
        },
        cardTemplate);
    return card.createCard();
}