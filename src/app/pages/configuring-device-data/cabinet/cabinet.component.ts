import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { CabinetService } from '../../../services/configuring-device-data/cabinet.service';
import { Cabinet } from '../../../models/configurin-device-data/cabinet.model';
import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styles: [
  ]
})
export class CabinetComponent implements OnInit {
  
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : Cabinet;
  
  subscripcion: Subscription;
  sidebarCommand:number = 61;
  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private cabinetService:CabinetService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      cn: [],
      type: [],
      desc: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.cabinetService.cargar()){
      const { id,
        parameterId,
        cn,
        type,
        desc} =this.cabinetService.cargar();
      this.object = new Cabinet(
        id,
        parameterId,
        cn,
        type,
        desc);
      
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
      cn,
      type,
      desc} = this.object;
    this.form.reset({
      parameterId,
      cn,
      type,
      desc
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.cabinetService.eliminar();
    
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
          cn,
          type,
          desc} = this.form.value;
      
      this.object = new Cabinet(
        id,
        parameterId,
        cn,
        type,
        desc);

      this.cabinetService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
