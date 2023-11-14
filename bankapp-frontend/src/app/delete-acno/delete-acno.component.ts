import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-acno',
  templateUrl: './delete-acno.component.html',
  styleUrls: ['./delete-acno.component.css']
})
export class DeleteAcnoComponent {
  @Input() deleteAcno:any //1

  //userdefined event -Oncancel event
  @Output() onCancel = new EventEmitter();  //it  helps us to create a new user defined event

  cancel(){
    this.onCancel.emit()  //emits an event containing agiven value
  }
}
