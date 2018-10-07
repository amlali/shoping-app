import { Ingredient } from "../models/ingredient";
import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import 'rxjs/Rx'
import {authService} from './auth';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
constructor( private http:Http,
private authServ:authService){}
  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token:string){
    const uid=this.authServ.getActiveUser().uid;
    return this.http.put('https://ion-recipe-book-56ab1.firebaseio.com/'+uid+'/'+'shooping-list.json?auth='+token
    ,this.ingredients).map((response:Response)=>{
      return response.json();
    });
  }
  fetchList(token:string){
    const uid=this.authServ.getActiveUser().uid;
    return this.http.get('https://ion-recipe-book-56ab1.firebaseio.com/'+uid+'/'+'shooping-list.json?auth='+token
    ,this.ingredients).map((response:Response)=>{
      return response.json();
    }).do((data)=>{
      this.ingredients=data;
    })
  }

}
