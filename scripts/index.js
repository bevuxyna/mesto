//Попапы
const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupOpenImage = document.querySelector('.popup_type_open-image');

//Формы
const formEdit = popupEdit.querySelector('.popup__form_type_profile');
const formAdd = popupAdd.querySelector('.popup__form_type_add');

//Элементы формы редактирования профиля
const profileAuthor = document.querySelector('.profile__author');
const profileDescription = document.querySelector('.profile__description');

//Элементы формы просмотра изображения места
const popupPicture = popupOpenImage.querySelector('.popup__picture');
const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = popupEdit.querySelector('.popup__button-close_type_profile');
const closeAddButton = popupAdd.querySelector('.popup__button-close_type_add');
const closeImageButton = popupOpenImage.querySelector('.popup__button-close_type_image');

//Инпуты
const nameInput = formEdit.querySelector('.popup__input_type_name');
const aboutInput = formEdit.querySelector('.popup__input_type_about');
const placeInput = formAdd.querySelector('.popup__input_type_place');
const linkInput = formAdd.querySelector('.popup__input_type_link');

//Template карточек мест
const cardTemplate = document.querySelector('.elements__item').content;
const placeElement = document.querySelector('.elements__box');

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





function openPopup (popup) {
    popup.classList.add('popup_opened');
}

//Закрытие popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

//Открытие формы для редактирования профиля (кнопка edit)
function profileEdit() {
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}

//Отправка формы редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    closePopup(popupEdit);
}

//Открытие формы для добавления новой карточки (кнопка add)
function addCard() {
    placeInput.value = '';
    linkInput.value = '';
    openPopup(popupAdd);
}

//Отправка формы добавления новой карточки
function formSubmitCards(evt){
    evt.preventDefault();
    closePopup(popupAdd);
}

//Добавление новой карточки
const createCard = (title, link) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    const cardTitle = cardElement.querySelector('.element__title').textContent = title;
    const cardLink = cardImage.src = link;
    const cardAlt = cardImage.alt = title;


//Удаление карточки
    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);

//Активная кнопка лайка
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardImage.addEventListener('click', () => {
        popupPicture.src = cardLink;
        popupPicture.alt = cardAlt;
        popupFigcaption.textContent = cardTitle;
        openPopup(popupOpenImage);
    });

    return cardElement;
}

//Функция удаления карточки
function deleteCard(evt){
    evt.target.closest('.element').remove();
}

//Загрузка карточек из массива
const initCards = () => {
    initialCards.forEach((item) => {
        placeElement.append(createCard(item.name, item.link));
    });
}

initCards();




//Открытие формы редактирования
editButton.addEventListener('click', profileEdit);

//Открытие формы добавления карточки
addButton.addEventListener('click', addCard);

//Закрытие popup
closeEditButton.addEventListener('click',() => {closePopup(popupEdit)});
closeAddButton.addEventListener('click',() => {closePopup(popupAdd)});
closeImageButton.addEventListener('click', () => {closePopup(popupOpenImage)});

//Отправка формы
popupEdit.addEventListener('submit', formSubmitHandler);
popupAdd.addEventListener('submit', formSubmitCards);







