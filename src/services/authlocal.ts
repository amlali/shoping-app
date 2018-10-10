import { Response, RequestOptions, Http} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http'
import 'rxjs/Rx'
import { Ingredient } from '../models/ingredient';
import { Storage } from '@ionic/storage';
import { storage } from 'firebase';

@Injectable()
export class AuthLocalServer{
    constructor(private http:HttpClient,private storage:Storage) {}
 url:string='http://localhost:3000';

    signin(email:string,password:string){
        let contentHeader = new HttpHeaders({"Content-Type": "application/json"});

        return new Promise((resolve, reject) => {
        this.http.post(this.url+'/signIn',{"email":email,"password":password},{ headers: contentHeader})
    .subscribe(data => {
        this.storage.set("token",data);
        console.log("header",data);
        resolve(data);

	},
    err => {
        reject(err);

    });
});
  }
        
    
    signup(email:string,password:string){
      let contentHeader = new HttpHeaders({"Content-Type": "application/json"});

    return new Promise((resolve, reject) => {
        this.http.post(this.url+'/signUp',{"email":email,"password":password},{ headers: contentHeader})
        .subscribe(data => {
            console.log(data);
            this.storage.set("token",data);
            resolve(data);
        },
        err => {
            reject(err);
            console.log(err);
        });
    });

    
  }
  storeData(token:string,list:Ingredient[]){
      console.log("======================================TOKEN ====>")
      console.log(token)
    let contentHeader = new HttpHeaders({"Content-Type": "application/json",
    "auth":token
});
console.log(contentHeader)
    return new Promise((resolve, reject) => {
        this.http.post(this.url+'/store',{"list":list},{'headers': { 'auth': token }})
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

  loadData(token:string){
    return new Promise((resolve, reject) => {
    
    
    let contentHeader = new HttpHeaders({"Content-Type": "application/json",
        "auth":token
    });
    console.log(contentHeader);

        this.http.post(this.url+'/load',{}, {headers: contentHeader})
        .subscribe(data => {
        console.log(data);
        resolve(data);
        },
        err => {
            reject(err);
            console.log(err);
        });
    });

  }
//   access(token:string){
//     return new Promise((resolve, reject) => {
//         let contentHeader = new HttpHeaders({"Content-Type": "application/json"});
// contentHeader.append("auth",token);
//         this.http.get(this.url+'/access',{ headers: contentHeader},{"auth":token})
//         .map(res => res)
//         .subscribe(data => {
//             console.log(JSON.stringify(data));
//             resolve(data);
//         },
//         err => {
//             reject(err);
//             console.log(err);
//         });
//     });
  //}



}



