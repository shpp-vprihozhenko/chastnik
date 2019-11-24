import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonDataService {
  commonDataObj = {
    city: '',
    user: {},
    curUrl: ''
  };

  constructor() {
    let arCurUrl = window.location.origin.split(':');
    this.commonDataObj.curUrl = arCurUrl[0] + ':' + arCurUrl[1] + ':6212/';
    console.log('curUrl', this.commonDataObj.curUrl);
  }

  async checkUser(email: string, pwd: string) {
    let response = await fetch(this.commonDataObj.curUrl + 'user/identify/' + email + '/' + pwd);
    let myJson = await response.json();
    console.log('got resp', myJson);
    if (myJson.err) {
      console.log('err', myJson.err);
      return false;
    } else {
      this.commonDataObj.user = { 
        email, name: myJson.user.name, perm: myJson.user.perm 
      };
      return true;
    }
  }

  async addUser(name: string, email: string, pwd: string, phone: string) {
    let response = await fetch(this.commonDataObj.curUrl + 'user/add', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({name, email, pwd, phone})
    });
    let myJson = await response.json();
    console.log('got resp', myJson);
    if (myJson.err) {
      console.log('err', myJson.err);
    } else {
      this.commonDataObj.user = { email, name };
    }
    return myJson;
  }

  async fetchCity() {
    let response = await fetch('http://ua.sxgeo.city/');
    let myJson = await response.json();
    //console.log(JSON.stringify(myJson));
    console.log('city', myJson.city.name_ru);
    console.log('ip', myJson.ip);
    this.commonDataObj.city = myJson.city.name_ru;
    return myJson.city.name_ru;
  }
}
