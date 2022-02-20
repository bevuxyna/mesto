//Попапы
const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');

//Формы
const formEdit = popupEdit.querySelector('.popup__form_type_profile');
const formAdd = popupAdd.querySelector('.popup__form_type_add');

//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const addButton = document.querySelector('.profile__add-button');

//Инпуты
const nameInput = formEdit.querySelector('.popup__input_type_name');
const aboutInput = formEdit.querySelector('.popup__input_type_about');
const placeInput = formAdd.querySelector('.popup__input_type_place');
const linkInput = formAdd.querySelector('.popup__input_type_link');

const profileAuthor = document.querySelector('.profile__author');
const profileDescription = document.querySelector('.profile__description');




function openPopup () {
    popupEdit.classList.add('popup_opened');
}

//Закрытие popup
function closePopup (popup) {
    popupEdit.classList.remove('popup_opened');
}

//Редактирование профиля (кнопка edit)
function profileEddit() {
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
    openPopup();
}

//Отправка формы редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    closePopup();
}

//Добавление новой карточки (кнопка add)
function addCard() {

    openPopup();

}

//Обработчики событий

//Открытие формы редактирования
editButton.addEventListener('click', profileEddit);

//Открытие формы добавления карточки
addButton.addEventListener('click', addCard);

//Закрытие popup
closeButton.addEventListener('click', closePopup);

//Отправка формы
popupEdit.addEventListener('submit', formSubmitHandler);


//Массив карточек мест
const initialCards = [
    {
        name: 'Байкал',
        link: 'images/philipp-trubchenko-08lvM7w-G30-unsplash.jpg'
    },
    {
        name: 'Эльбрус',
        link: 'images/dmitrii-vaccinium-9qsK2QHidmg-unsplash.jpg'
    },
    {
        name: 'Телецкое, Республика Алтай',
        link: 'images/nick-night-v_0g5mGwHM0-unsplash.jpg'
    },
    {
        name: 'Архыз',
        link: 'images/denis-zelenykh-CvSvsqdFLcI-unsplash.jpg'
    },
    {
        name: 'Рускеала',
        link: 'images/victor-malyushev-qGcnIyX0SZU-unsplash%20(1).jpg'
    },
    {
        name: 'Остров Русский',
        link: 'images/fedor-shlyapnikov-mc3sRmbEA2o-unsplash%20(1).jpg'
    }
];



