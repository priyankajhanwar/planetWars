import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {


	 baseUrl: string = 'https://swapi.co/api/people/';
  queryUrl: string = '?search=';

  constructor(private http: Http) { }


   onLogin(user,password){
    return this.http.get(this.baseUrl + this.queryUrl + user).map(res => res.json());
  }


}
