import '../pages/index.css';

import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {
    popups,
    popupEdit,
    popupAdd,
    formAdd,
    profileAuthor,
    profileDescription,
    buttonEditProfile,
    buttonAddCard,
    nameInput,
    aboutInput, placeInput, linkInput, placeElement, initialCards, validationSettings
} from '../utils/constants.js';


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
buttonAddCard.addEventListener('click', () => {
    addCardValidator.resetValidation();
    openPopup(popupAdd);
});

//Отправка формы
popupEdit.addEventListener('submit', handleProfileFormSubmit);
popupAdd.addEventListener('submit', handleCardFormSubmit);
