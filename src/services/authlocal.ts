import { Response, RequestOptions, Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http'
import 'rxjs/Rx'
import { Ingredient } from '../models/ingredient';
@Injectable()
export class AuthLocalServer{
    constructor(private http:HttpClient) {}
 url:string='http://localhost:3000';

    signin(email:string,password:string){
        return new Promise((resolve, reject) => {
        this.http.post(this.url+'/signIn',{"email":email,"password":password})
    .map(res=>res)
    .subscribe(data => {
       // console.log("header",JSON.stringify(data));
        resolve(data);

	},
    err => {
        reject(err);

    });
});
  }
        
    
    signup(email:string,password:string){
    return new Promise((resolve, reject) => {
        this.http.post(this.url+'/signUp',{"email":email,"password":password})
        .map(res => res)
        .subscribe(data => {
            //console.log(JSON.stringify(data));
            resolve(data);
        },
        err => {
            reject(err);
            console.log(err);
        });
    });

    
  }
  storeData(email:string,list:Ingredient[]){
    return new Promise((resolve, reject) => {
        this.http.post(this.url+'/store',{"email":email,"list":list})
        .map(res => res)
        .subscribe(data => {
            //console.log(JSON.stringify(data));
            resolve(data);
        },
        err => {
            reject(err);
            //console.log(err);
        });
    });
  }

  loadData(email:string){
    return new Promise((resolve, reject) => {
        this.http.post(this.url+'/load',{"email":email})
        .map(res => res)
        .subscribe(data => {
            //console.log(JSON.stringify(data));
            resolve(data);
        },
        err => {
            reject(err);
            //console.log(err);
        });
    });
  }


}



