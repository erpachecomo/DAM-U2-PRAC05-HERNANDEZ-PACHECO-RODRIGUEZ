import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Modal } from './modal';

@NgModule({
  declarations: [
    Modal,
  ],
  imports: [
    IonicPageModule.forChild(Modal),
  ],
  exports: [
    Modal
  ]
})
export class ModalModule {}
