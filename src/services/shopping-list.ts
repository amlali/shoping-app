import { Ingredient } from "../models/ingredient";
import { Injectable } from '@angular/core';
import { Response,Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx'
import {authService} from './auth';
import { AuthLocalServer } from "./authlocal";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
constructor( private http:HttpClient,
private authServ:authService,private authLocalServ:AuthLocalServer){}
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

//   storeList(token:string){
//     const uid=this.authServ.getActiveUser().uid;
//     return this.http.put('https://ion-recipe-book-56ab1.firebaseio.com/'+uid+'/'+'shooping-list.json'
//     ,this.ingredients).map((response:Response)=>{
//       return response;
//     });
//   }
//   fetchList(token:string){
//     console.log("inside fetchList");
    
//     const uid=this.authServ.getActiveUser().uid;
//     return this.http.get('https://ion-recipe-book-56ab1.firebaseio.com/'+uid+'/'+'shooping-list.json'
//     ).map((response:Response)=>{
//       console.log(response);
      
//       return response;
//     }).do(data =>{
// console.log(data);

//     })
//   }
storeList(token:string){

return this.authLocalServ.storeData(token,this.ingredients);
}
fetchList(token:string){
  console.log("TOKEN FROM ISIDE FETCH LIST =--------------------------");
  console.log(token)
  return this.authLocalServ.loadData(token);

}

}
