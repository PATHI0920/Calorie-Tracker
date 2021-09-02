import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url : string = 'https://pathi0920.github.io/data/data.json'
  constructor(private _http : HttpClient) { 
  }
  
  getMenuList() : Observable<item[]> {
    console.log('entered')
    return this._http.get<item[]>(this.url)
  }
}
