import { Component } from '@angular/core';
import {  ViewController} from 'ionic-angular';
@Component({
  selector: 'page-signin',
  template: `
  <ion-grid>
  <ion-row>
  <ion-col>
  <h3>store & load</h3>
    </ion-col>
      </ion-row>
      <ion-row>
      <ion-col>
      <button ion-button outline (click)="onAction('load')">Load</button>
        </ion-col>
          </ion-row>
          <ion-row>
          <ion-col>
          <button ion-button outline (click)="onAction('store')">Store</button>
            </ion-col>
              </ion-row>
    </ion-grid>
  `
})
export class SlOptionPage{
  constructor(private viewCtlr:ViewController){}
  onAction(action:string){
    this.viewCtlr.dismiss({action:action})
  }
}
