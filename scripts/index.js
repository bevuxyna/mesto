let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_name');
let aboutInput = formElement.querySelector('.popup__input_about');

let profileAuthor = document.querySelector('.profile__author');
let profileDescription = document.querySelector('.profile__description');

const likeButton = document.querySelector('.element__like-button');

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

likeButton.addEventListener('click',clickLike);

function clickLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

