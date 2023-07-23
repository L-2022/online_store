import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._userInfo = {};
    this._basketStatus = false;
    this._userRole = {};
    makeAutoObservable(this);
  }

  setBasketStatus(basketStatus) {
    this._basketStatus = basketStatus;
  }

  get basketStatus() {
    return this._basketStatus;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
  }
  setUserRole(userRole) {
    this._userRole = userRole;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get userInfo() {
    return this._userInfo;
  }
  get userRole() {
    return this._userRole;
  }
  
}
