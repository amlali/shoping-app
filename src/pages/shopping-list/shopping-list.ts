import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import{SlOptionPage} from './sl-option/sl-option'
import {PopoverController, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

import { authService } from "../../services/auth";
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  listItems: Ingredient[];
userEmail:string;
  constructor(private slService: ShoppingListService,
    private popoverCtrl:PopoverController,
  private authServ:authService,private navParam:NavParams,
  private storage:Storage) {}
ngOnInit(){
  this.storage.get('email').then((data)=>{
    this.userEmail=data;
    });



console.log(this.navParam.get('email'));
}
  ionViewWillEnter() {
    console.log('inside shoping list ')
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
      // this.authServ.getActiveUser().getIdToken()
      // .then((token:string)=>{
      //  // console.log(token);
        
      // this.slService.fetchList(token)
      // .then(
      //   (list:any)=>{
      //     console.log("Im HEREEEEEEEEEEEEEEEEEEee")
      //     console.log("list",list);
          
      //     if(list){
      //       this.listItems=list;
      //     }
      //     else{
      //       this.listItems=[];
      //     }
      //   },
      //   error=>{
      //     console.log(error)})
      // });

      this.slService.fetchList(this.userEmail).then((list)=>{
        if(list){
                this.listItems=(<Ingredient[]>list);
              }
              else{
                this.listItems=[];
              }
              console.log('yes');
      }).catch(()=>{
        console.log('no');

      });




    }
    else{
// this.authServ.getActiveUser().getIdToken(true)
// .then((token:string)=>{
//   console.log(token);

// this.slService.storeList(token)
// .subscribe(
//   ()=>console.log('yes'),
//   error=>{
//     console.log('no')})
// });
this.slService.storeList(this.userEmail).then(()=>{
  console.log('yes');
  
}).catch((error)=>{
  console.log('no');
})

    }

  })
  }
}
