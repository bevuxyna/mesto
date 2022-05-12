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
    buttonEditProfile, buttonAddCard, buttonEditAvatar, buttonDelete,
    nameInput,
    aboutInput, avatarInput, cardTemplate, placeElement, validationSettings
} from '../utils/constants.js';
import {PopupWithConfirm} from "../components/PopupWithConfirm";



const api = new Api(apiOptions);

let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData._id;

        profile.setUserInfo(userData);
        profile.setUserAvatar(userData);

        cards.renderItems(initialCards);
        }
    )
    .catch((err) => {
        console.log(err)
    })


const cards = new Section({
    items: [],
    renderer: (items) => {
        const card = createNewCard(items);
        cards.addItem(card);
    }
}, placeElement);

const profileValidator = new FormValidator(validationSettings, popupEdit);
const addCardValidator = new FormValidator(validationSettings, popupAdd);
const avatarValidator = new FormValidator(validationSettings, popupEditAvatar);
profileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();


//Экземпляр профиля
const profile = new UserInfo({
    profileName: '.profile__author',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar'
});

//Экземпляр формы редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, {
    handleSubmitForm: (formData) => {
        popupEditProfile.renderLoading(true);
        api.updateUserInfo(formData)
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
const editAvatar = new PopupWithForm(popupEditAvatar, {
    handleSubmitForm: (formData) => {
        editAvatar.renderLoading(true);
        api.updateAvatar(formData)
            .then((res) => {
                profile.setUserAvatar(res);
                editAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                editAvatar.renderLoading(false);
            })
        editAvatar.close();
    }

});

editAvatar.setEventListeners();

//Открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
    editAvatar.open();
    avatarValidator.toggleButtonState();
    avatarValidator.resetValidation();
});




//Экземпляр формы добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, {
    handleSubmitForm: (formData) => {
        cards.addItem(formData);
        popupAddCard.close();
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
const popupDeleteCard = new PopupWithConfirm(popupConfirmDelete);


//Экземпляр попапа просмотра картинки
const popupOpenPicture = new PopupWithImage(popupOpenImage);



const createNewCard = (data) => {
    const card = new Card({
            data, userId,
        handleCardClick: () => {
            popupOpenPicture.open(data.name, data.link);
            },

            handleDeleteClick: () => {
                popupDeleteCard.open();
            },
        handleLikeCard: () => {
            if (card.isLiked()) {
                api.deleteLike(card._id)
                    .then((data) => {
                        card.deleteLike();
                        card.setLike(data.like);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`))

            } else {
                api.setLike(card._id)
                    .then((data) => {
                        card.addLike();
                        card.setLike(data.like);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`))
            }
        }
        },
        cardTemplate);
    const newCard = card.createCard()
    return newCard;
}

popupOpenPicture.setEventListeners();


cards.renderItems();