import './index.css';

import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from "../components/Section";
import {PopupWithForm} from "../components/PopupWithForm";
import {PopupWithImage} from "../components/PopupWithImage";
import {UserInfo} from "../components/UserInfo";
import {
    popupEdit,
    popupAdd, popupOpenImage,
    buttonEditProfile,
    buttonAddCard,
    nameInput,
    aboutInput, cardTemplate, placeElement, initialCards, validationSettings,
} from '../utils/constants.js';


const profileValidator = new FormValidator(validationSettings, popupEdit);
const addCardValidator = new FormValidator(validationSettings, popupAdd);
profileValidator.enableValidation();
addCardValidator.enableValidation();


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






