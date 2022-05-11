export const apiOptions = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: '051d708c-058c-4034-9252-0a36ac6463d7',
        'Content-Type': 'application/json'
    }
};

//Попапы
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_profile');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupEditAvatar = document.querySelector('.popup_type_avatar');
export const popupConfirmDelete = document.querySelector('.popup_type_delete');

export const popupOpenImage = document.querySelector('.popup_type_open-image');
export const popupPicture = popupOpenImage.querySelector('.popup__picture');
export const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

//Формы
export const formEdit = popupEdit.querySelector('.popup__form_type_profile');
export const formAdd = popupAdd.querySelector('.popup__form_type_add');
export const formAvatar = popupEditAvatar.querySelector('.popup__form_type_avatar');

//Элементы формы редактирования профиля
export const profileAuthor = document.querySelector('.profile__author');
export const profileDescription = document.querySelector('.profile__description');

//Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');
export const buttonDelete = document.querySelector('.element__delete-button');

//Инпуты
export const nameInput = formEdit.querySelector('.popup__input_type_name');
export const aboutInput = formEdit.querySelector('.popup__input_type_about');
export const placeInput = formAdd.querySelector('.popup__input_type_place');
export const linkInput = formAdd.querySelector('.popup__input_type_link');
export const avatarInput = formAvatar.querySelector('.popup__input_type_avatar');

//Template карточек мест
export const cardTemplate = '.elements__item';
export const placeElement = '.elements__box';


import baikalImage from '../styles/images/philipp-trubchenko-08lvM7w-G30-unsplash.jpg';
import elbrusImage from '../styles/images/dmitrii-vaccinium-9qsK2QHidmg-unsplash.jpg';
import teleckoeImage from '../styles/images/nick-night-v_0g5mGwHM0-unsplash.jpg';
import arhyzImage from '../styles/images/denis-zelenykh-CvSvsqdFLcI-unsplash.jpg';
import ruskealaImage from '../styles/images/victor-malyushev-qGcnIyX0SZU-unsplash (1).jpg';
import ostrovRusskiyImage from '../styles/images/fedor-shlyapnikov-mc3sRmbEA2o-unsplash (1).jpg';

//Массив карточек мест
export const initialCards = [
    {
        name: 'Байкал',
        link: baikalImage
    },
    {
        name: 'Эльбрус',
        link: elbrusImage
    },
    {
        name: 'Телецкое, Республика Алтай',
        link: teleckoeImage
    },
    {
        name: 'Архыз',
        link: arhyzImage
    },
    {
        name: 'Рускеала',
        link: ruskealaImage
    },
    {
        name: 'Остров Русский',
        link: ostrovRusskiyImage
    }
];

// Функция принимает как объект настроек все нужные функциям классы и селекторы элементов
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    submitButtonDisabled: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

