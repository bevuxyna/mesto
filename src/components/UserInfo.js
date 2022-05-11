export class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._name = document.querySelector(profileName);
        this._about = document.querySelector(profileDescription);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        this._userData = {
            userName: this._name.textContent,
            userInfo: this._about.textContent,
        }
        return this._userData;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }

    setUserAvatar(url) {
        this._avatar.src = url.avatar;
    }
}