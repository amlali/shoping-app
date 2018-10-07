import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import{SlOptionPage} from './sl-option/sl-option'
import {PopoverController} from 'ionic-angular';

import { authService } from "../../services/auth";
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService,
    private popoverCtrl:PopoverController,
  private authServ:authService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }



  onShowOption(event:MouseEvent){
  const option= this.popoverCtrl.create(SlOptionPage);
  option.present({ev:event});
  option.onDidDismiss(data=>{
    if(data.action=='load'){
      this.authServ.getActiveUser().getToken()
      .then((token:string)=>{
      this.slService.fetchList(token)
      .subscribe(
        (list:Ingredient[])=>{
          if(list){
            this.listItems=list;
          }
          else{
            this.listItems=[];
          }
        },
        error=>{
          console.log('no')})
      });

    }
    else{
this.authServ.getActiveUser().getToken()
.then((token:string)=>{
this.slService.storeList(token)
.subscribe(
  ()=>console.log('yes'),
  error=>{
    console.log('no')})
});
    }

  })
  }
}
