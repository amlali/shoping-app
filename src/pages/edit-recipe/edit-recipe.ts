import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController, NavController
} from "ionic-angular";
import {Recipes} from '../../models/recipes';

import {recipesService} from '../../services/recipe';
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
selectOptions = ['Easy', 'Medium', 'Hard'];
recipeForm: FormGroup;
recipe:Recipes;
index:number;

constructor(private navParams: NavParams,
  private navCtrl: NavController,
  private actionSheetctrl:ActionSheetController,
private alertCtrl:AlertController,
private toastCtlr:ToastController,
private recipeServ:recipesService ) {}

    private initializeForm() {

      let title = null;
        let description = null;
        let difficulty = 'Medium';
        let ingredients = [];

        if (this.mode == 'Edit') {
          title = this.recipe.title;
          description = this.recipe.description;
          difficulty = this.recipe.difficulty;
          for (let ingredient of this.recipe.ingredients) {
            ingredients.push(new FormControl(ingredient.name, Validators.required));
          }
        }


      this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
    }
    ngOnInit() {
      this.mode=this.navParams.get('mode');
      if(this.mode=='Edit'){
        this.recipe=this.navParams.get('recipe');
        this.index=this.navParams.get('index');
      }

      this.initializeForm();

    }

    onSubmit(){
      let value=this.recipeForm.value;
      let ingredients=[];
      if(value.ingredients.length>0){
        ingredients=value.ingredients.map(name=>{
          return {name:name,amount:1};
        });
      }
      if (this.mode == 'Edit') {
        this.recipeServ.updateRecipes(this.index,value.title,value.description,value.difficulty,ingredients);

      }
      else{
        this.recipeServ.addRecipes(value.title,value.description,value.difficulty,ingredients);

      }
       this.recipeForm.reset();
         this.navCtrl.popToRoot();
    }

    onManageIngredients(){
      const actionSheet=this.actionSheetctrl.create({
        title:"what do you need to do",
        buttons:[{
          text:'add new Ingredients',
          handler:()=>{
            this.createNewIngredientAlert().present();
          }
        },
        {
          text:'Remove all Ingredients',
          role:'destructive',
          handler:()=>{
          const  fArray:FormArray=<FormArray>this.recipeForm.get('ingredients');
            let end=fArray.length;
            if(end>0){
              for(let i=end-1;i>=0;i--)
              {
                fArray.removeAt(i);
              }
              const toast= this.toastCtlr.create({
                  message:'All item removed successfully',
                  duration:2000,
                  position:'bottom'
                });
              toast.present();
            }

          }
        },
        {
          text:'Cancel',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
    }
    private createNewIngredientAlert(){
      return this.alertCtrl.create({
        title:'Add new ingredients',
        inputs:[{
          name:'name',
          placeholder:'name'
        }],
        buttons:[{
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Add',
          handler:data=>{
            if(data.name.trim()==''||data.name==null){
            const toast= this.toastCtlr.create({
                message:'pleade Enter valid data',
                duration:2000,
                position:'bottom'
              });
            toast.present();
                return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast= this.toastCtlr.create({
                message:'Item Added!',
                duration:2000,
                position:'bottom'
              });
            toast.present();
          }
        }]

      });
    }
}
