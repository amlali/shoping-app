import { Component, OnInit, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {authService} from '../../services/auth'
import { AuthLocalServer } from '../../services/authlocal';
import { TabsPage } from '../tabs/tabs';

import { Storage } from '@ionic/storage';


@Injectable()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private authServ:authService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private authLocalServ:AuthLocalServer,
    private storage: Storage) {
  }
  ngOnInit(){

  }

  ionViewWillEnter(){
    //console.log(this.storage.get('token'));
    this.storage.get('token').then((data)=>{
      console.log(data);
      
      if(data!==undefined){
      
        this.navCtrl.push(TabsPage);
      }}).catch((e)=>{
console.log(e);

      })      
    }

  
   // this.authLocalServ.access()
  
  onSignIn(f:NgForm){
    const load=this.loadingCtrl.create({
      content:"Log In...."
    });
    load.present();
      // this.authServ.signin(f.value.email,f.value.password)

    this.authLocalServ.signin(f.value.email,f.value.password)
  .then(data=>{
   // this.storage.set('email',data);
    this.navCtrl.push(TabsPage);
    load.dismiss();
  })
  .catch(error=>{
    load.dismiss();
    console.log(error);
    const alert=this.alertCtrl.create({
      title:'sign in failed!',
      message:error.error,
      buttons:['Ok']
    });
    alert.present();
  });
  }

  }
