//Попапы
const popups = document.querySelectorAll('.popup');
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


//Открытие popup
function openPopup (popup) {
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

//Открытие изображения места
    cardImage.addEventListener('click', () => {
        popupPicture.src = cardLink;
        popupPicture.alt = cardAlt;
        popupFigcaption.textContent = cardTitle;
        openPopup(popupOpenImage);
    });

    return cardElement;
}

//Загрузка карточек из массива
const initCards = () => {
    initialCards.forEach((item) => {
        placeElement.append(createCard(item.name, item.link));
    });
}

initCards();

//Добавление карточки нового места (отправка формы)
const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    placeElement.prepend(createCard(placeInput.value, linkInput.value));
    closePopup(popupAdd);
    formAdd.reset();
    disableSubmitButton(buttonSubmitForm, validationSettings);
}

//Функция удаления карточки
function deleteCard(evt){
    evt.target.closest('.element').remove();
}



//Открытие формы редактирования
buttonEditProfile.addEventListener('click', editProfile);

//Открытие формы добавления карточки
buttonAddCard.addEventListener('click', () => {openPopup(popupAdd)});

//Отправка формы
popupEdit.addEventListener('submit', handleProfileFormSubmit);
popupAdd.addEventListener('submit', handleCardFormSubmit);





