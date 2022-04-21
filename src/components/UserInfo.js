import {aboutInput, nameInput, profileAuthor, profileDescription} from "../utils/constants";

export class UserInfo {
    constructor({profileName, profileDescription}) {
        this._name = document.querySelector(profileName);
        this._info = document.querySelector(profileDescription);
    }

//Возвращает объект с данными пользователя
    getUserInfo() {
        this._userData = {
            name: this._name,
            info: this._info
        }
        return this._userData;
    }

//Принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({name, info}) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}