//Попапы
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_profile');
export const popupAdd = document.querySelector('.popup_type_add');

export const popupOpenImage = document.querySelector('.popup_type_open-image');
export const popupPicture = popupOpenImage.querySelector('.popup__picture');
export const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

//Формы
export const formEdit = popupEdit.querySelector('.popup__form_type_profile');
export const formAdd = popupAdd.querySelector('.popup__form_type_add');

//Элементы формы редактирования профиля
export const profileAuthor = document.querySelector('.profile__author');
export const profileDescription = document.querySelector('.profile__description');

//Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonSubmitForm = popupAdd.querySelector('.popup__button-submit');

//Инпуты
export const nameInput = formEdit.querySelector('.popup__input_type_name');
export const aboutInput = formEdit.querySelector('.popup__input_type_about');
export const placeInput = formAdd.querySelector('.popup__input_type_place');
export const linkInput = formAdd.querySelector('.popup__input_type_link');

//Template карточек мест
export const cardTemplate = document.querySelector('.elements__item').content;
export const placeElement = document.querySelector('.elements__box');

// Функция принимает как объект настроек все нужные функциям классы и селекторы элементов
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    submitButtonDisabled: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}