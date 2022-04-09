import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

//Попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');

//Формы
const formEdit = popupEdit.querySelector('.popup__form_type_profile');
const formAdd = popupAdd.querySelector('.popup__form_type_add');

//Элементы формы редактирования профиля
const profileAuthor = document.querySelector('.profile__author');
const profileDescription = document.querySelector('.profile__description');

//Кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonSubmitForm = popupAdd.querySelector('.popup__button-submit');

//Инпуты
const nameInput = formEdit.querySelector('.popup__input_type_name');
const aboutInput = formEdit.querySelector('.popup__input_type_about');
const placeInput = formAdd.querySelector('.popup__input_type_place');
const linkInput = formAdd.querySelector('.popup__input_type_link');

//Template карточек мест
const cardTemplate = document.querySelector('.elements__item').content;
const placeElement = document.querySelector('.elements__box');

// Функция принимает как объект настроек все нужные функциям классы и селекторы элементов
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    submitButtonDisabled: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

//Экземпляры
const profileValidator = new FormValidator(validationSettings, popupEdit);
const addCardValidator = new FormValidator(validationSettings, popupAdd);
profileValidator.enableValidation();
addCardValidator.enableValidation();

function createNewCard(data, cardTemplateSelector) {
    const card = new Card(data, cardTemplateSelector);
    return card.createCard();
}

function addCard(data, cardTemplateSelector) {
    const cardElement = createNewCard(data, cardTemplateSelector)
    placeElement.prepend(cardElement);
}

//Открытие popup
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

//Закрытие popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

//Закрытие popup нажатием на крестик или оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        }
    });
});

//Закрытие popup нажатием на клавишу Esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Открытие формы для редактирования профиля (кнопка edit)
function editProfile() {
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}

//Отправка формы редактирования профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    closePopup(popupEdit);
}

//Загрузка карточек из массива
initialCards.forEach(function(item) {
    addCard(item, '.elements__item');
});

//Добавление карточки нового места (отправка формы)
const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const data = {
        name: placeInput.value,
        link: linkInput.value
    }
    addCard(data, '.elements__item');
    closePopup(popupAdd);
    formAdd.reset();
    addCardValidator.disableSubmitButton();
}

//Открытие формы редактирования
buttonEditProfile.addEventListener('click', editProfile);

//Открытие формы добавления карточки
buttonAddCard.addEventListener('click', () => {openPopup(popupAdd)});

//Отправка формы
popupEdit.addEventListener('submit', handleProfileFormSubmit);
popupAdd.addEventListener('submit', handleCardFormSubmit);
