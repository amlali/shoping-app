import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {authService} from '../../services/auth'
import { AuthLocalServer } from '../../services/authlocal';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,private authLocalServ:AuthLocalServer) {
  }
onSignUp(f:NgForm){
  const load=this.loadingCtrl.create({
    content:"siging you up...."
  });
  load.present();
//this.authServ.signup(f.value.email,f.value.password)
this.authLocalServ.signup(f.value.email,f.value.password)
.then(data=>{
  
  load.dismiss();
  this.navCtrl.push(TabsPage);

})
.catch(error=>{
  load.dismiss();
  const alert=this.alertCtrl.create({
    title:'sign up failed!',
    message:error.error,
    buttons:['Ok']
  });
  alert.present();
});
}


}
