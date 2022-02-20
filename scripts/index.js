const editButton = document.querySelector('.profile__edit-button');
const popUp = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__container');

const nameInput = formElement.querySelector('.popup__input_type_name');
const aboutInput = formElement.querySelector('.popup__input_type_about');

const profileAuthor = document.querySelector('.profile__author');
const profileDescription = document.querySelector('.profile__description');



function openPopup () {
    popUp.classList.add('popup_opened');
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
}

function closePopup () {
    popUp.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    closePopup ();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);




