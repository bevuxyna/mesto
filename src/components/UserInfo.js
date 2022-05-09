export class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._name = document.querySelector(profileName);
        this._info = document.querySelector(profileDescription);
        this._avatar = document.querySelector(profileAvatar);
    }

//Возвращает объект с данными пользователя
    getUserInfo() {
        this._userData = {
            userName: this._name.textContent,
            userInfo: this._info.textContent,
            userAvatar: this._avatar.src
        }
        return this._userData;
    }

//Принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({name, info, avatar}) {
        this._name.textContent = name;
        this._info.textContent = info;
        this._avatar.src = avatar;
    }
}