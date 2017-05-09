import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

/**
 * Generated class for the Modaladd page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modaladd',
  templateUrl: 'modaladd.html',
})
//import { CheckBoxValidator } from './../../validators/checkbox';

export class ModalAddPage {

  public email: any = "";
  public title: string="Agregar usuario";
  public id: string="";
  public name: any = "";
  public username: any = "";
  public birthday: any = "";
  public password: any = "";

  public myForm: FormGroup;
  public isUpdate: boolean=false;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams:NavParams,private formBuilder: FormBuilder,public http:Http) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    let id=navParams.get('_id');
    console.log(id);
    if(id!=null){
      this.http.get('http://138.68.233.27/test/user/'+id)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.title="Editar "+data.user[0].name;              
        this.name.setValue(data.user[0].name);
        this.username.setValue(data.user[0].username);
        this.birthday.setValue(data.user[0].date);
        this.password.setValue(data.user[0].password);
        this.email.setValue(data.user[0].email);
    });
    this.id=id;
    this.isUpdate=true;
    }//if

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [<any>Validators.pattern(emailRegex), Validators.required]],
    });

    this.name = this.myForm.controls['name'];
    this.username = this.myForm.controls['username'];
    this.password = this.myForm.controls['password'];
    this.email = this.myForm.controls['email'];
    this.birthday = this.myForm.controls['birthday'];
  }

  sendData() {
    let data = {
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      date: this.birthday.value,
      password: this.password.value,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
if(this.isUpdate){
  this.http.put('http://138.68.233.27/test/user/'+this.id,data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        this.dismiss();        
    });
}else{
    this.http.post('http://138.68.233.27/test/user',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        this.dismiss();        
    });}

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
