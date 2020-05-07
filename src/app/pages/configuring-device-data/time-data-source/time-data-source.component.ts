import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { TimeDataSourceServiceService } from '../../../services/configuring-device-data/time-data-source-service.service';

import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';
import { TimeDataSource } from '../../../models/configurin-device-data/timeDataSource.model';

@Component({
  selector: 'app-time-data-source',
  templateUrl: './time-data-source.component.html',
  styles: [
  ]
})
export class TimeDataSourceComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : TimeDataSource;
  
  subscripcion: Subscription;
  sidebarCommand:number = 99;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private timeDataSourceServiceService:TimeDataSourceServiceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    parameterId:  new FormControl(null),
    timesrc: []
  });
  this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
  if(this.timeDataSourceServiceService.cargar()){
    const { id,
      parameterId,
      timesrc} =this.timeDataSourceServiceService.cargar();
    this.object = new TimeDataSource(
      id,
      parameterId,
      timesrc);
    
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));

      
  }
}

openScrollableContent(longContent) {
  this.modalService.open(longContent, { scrollable: true });
}

editar() {
  const { id,
    parameterId,
    timesrc} = this.object;
  this.form.reset({
    parameterId,
    timesrc
  });
  this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
  this.editarForm = true;
}

eliminar() {
  this.object = null;
  this.timeDataSourceServiceService.eliminar();
  
  this.store.dispatch(
    actions.editarSidebarCommand({
      sidebarCommand: new SidebarCommand(this.sidebarCommand,'//')
    }));
}

guardar() {
  //console.log(this.dhcpswForm.value);

 /* if (this.configDataForm.invalid) {
    return Object.values(this.configDataForm.controls).forEach(control => {
      control.markAsTouched();
    });

  } else {
*/
    let id;
    (!this.editarForm) ?
      id = this.sidebarCommand :
      id = this.object.id;

      const { 
        parameterId,
        timesrc} = this.form.value;
    
    this.object = new TimeDataSource(
      id,
      parameterId,
      timesrc);

    this.timeDataSourceServiceService.guardar(this.object);
    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
      }));


    this.form.reset();
    this.editarForm = false;

}

}
