import './index.css';

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
    aboutInput, cardTemplate, placeElement, initialCards, validationSettings
} from '../utils/constants.js';
import {PopupWithConfirm} from "../components/PopupWithConfirm";


const profileValidator = new FormValidator(validationSettings, popupEdit);
const addCardValidator = new FormValidator(validationSettings, popupAdd);
const avatarValidator = new FormValidator(validationSettings, popupEditAvatar);
profileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();


//Экземпляр профиля
const profile = new UserInfo({
    profileName: '.profile__author',
    profileDescription: '.profile__description'
});

//Экземпляр формы редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, {
    handleSubmitForm: (formData) => {
        profile.setUserInfo(formData);
        popupEditProfile.close();
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



//Экземпляр попапа просмотра картинки
const popupOpenPicture = new PopupWithImage(popupOpenImage);

const createNewCard = (data) => {
    const card = new Card({
            data, handleCardClick: () => {
            popupOpenPicture.open(data.name, data.link);
            }
        }, cardTemplate);
    return card;
}

popupOpenPicture.setEventListeners();

const cards = new Section({
    items: initialCards, renderer: (initialCards) => {
        const card = createNewCard(initialCards);
        return card.createCard();
    }
}, placeElement);
cards.renderItems();







//Экземпляр формы редактирования аватара
const editAvatar = new PopupWithForm(popupEditAvatar, {
    handleSubmitForm: (formData) => {

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


const popupDeleteCard = new PopupWithConfirm(popupConfirmDelete);

buttonDelete.addEventListener('click', () => {
    popupDeleteCard.open();
});








