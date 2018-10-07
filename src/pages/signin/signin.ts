import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {authService} from '../../services/auth'



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authServ:authService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
  }
  onSignIn(f:NgForm){
    const load=this.loadingCtrl.create({
      content:"Log In...."
    });
    load.present();
  this.authServ.signin(f.value.email,f.value.password)
  .then(data=>{
    load.dismiss();
  })
  .catch(error=>{
    load.dismiss();
    const alert=this.alertCtrl.create({
      title:'sign in failed!',
      message:error.message,
      buttons:['Ok']
    });
    alert.present();
  });
  }

  }
