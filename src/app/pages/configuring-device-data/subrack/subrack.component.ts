import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { SubrackService } from '../../../services/configuring-device-data/subrack.service';

import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';
import { Subrack } from '../../../models/configurin-device-data/subrack.model';

@Component({
  selector: 'app-subrack',
  templateUrl: './subrack.component.html'
})
export class SubrackComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : Subrack;
  
  subscripcion: Subscription;
  sidebarCommand:number = 65;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private subrackService:SubrackService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      cn: [],
      srn: [],
      type: [],
      desc: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.subrackService.cargar()){
      const { id,
        parameterId,
        cn,
        srn,
        type,
        desc} =this.subrackService.cargar();
      this.object = new Subrack(
        id,
        parameterId,
        cn,
        srn,
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
      srn,
      type,
      desc} = this.object;
    this.form.reset({
      parameterId,
      cn,
      srn,
      type,
      desc
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.subrackService.eliminar();
    
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
          srn,
          type,
          desc} = this.form.value;
      
      this.object = new Subrack(
        id,
        parameterId,
        cn,
        srn,
        type,
        desc);

      this.subrackService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
