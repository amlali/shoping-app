import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {authService} from '../../services/auth'
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authServ:authService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
  }
onSignUp(f:NgForm){
  const load=this.loadingCtrl.create({
    content:"siging you up...."
  });
  load.present();
this.authServ.signup(f.value.email,f.value.password)
.then(data=>{
  load.dismiss();
})
.catch(error=>{
  load.dismiss();
  const alert=this.alertCtrl.create({
    title:'sign up failed!',
    message:error.message,
    buttons:['Ok']
  });
  alert.present();
});
}


}
