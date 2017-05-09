//import { Modal } from './../modal/modal';
import { ModalAddPage } from './../modaladd/modaladd';
import { ModalController,ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users:any;
  constructor(public modalCtrl: ModalController,public viewCtrl: ViewController,public http: Http,public navCtrl: NavController) {
    this.cargarTodo();
  }
  cargarTodo(){
    //this.http.get('http://herramientastepic.com.mx/api/Usuario')
    this.http.get('http://138.68.233.27/test/users')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);        
        this.users = data.users;
    });
    
  }
agregarUsuario(){
  console.log('jijitl');
  let modal = this.modalCtrl.create(ModalAddPage,{_id:null});
    modal.present().then(data=>{
      console.log(data);
    },
    data=>{
      console.log(data);
    });
}
  


  borrar(id){
    this.http.delete('http://138.68.233.27/test/user/'+id)
    .map(res => res.json())
      .subscribe(data => {
        console.log(data); 
        this.cargarTodo();      
    });
  }
dismiss() {
    this.viewCtrl.dismiss();
  }
  editar(id){
   console.log(id);
  let modal = this.modalCtrl.create(ModalAddPage,{_id:id});
    modal.present().then(data=>{
      console.log(data);
    },
    data=>{
      console.log(data);
    });
  }

}
