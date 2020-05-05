import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';


import { EnodebFuntion } from '../../../models/configurinBasicData/eNodeBFunction.model';
import { EnodebFunctionService } from '../../../services/configBasicData/enodeb-function.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-enodeb-function',
  templateUrl: './enodeb-function.component.html',
  styles: [
  ]
})
export class EnodebFunctionComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : EnodebFuntion;
  
  subscripcion: Subscription;
  sidebarCommand:number = 40;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private enodebFunctionService:EnodebFunctionService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      eNodeBFunctionName: ['', ],
      applicationRef: ['', ],
      enodebId: ['', ],
      userLabel: ['', ]
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.enodebFunctionService.cargar()){
      const { id,
        parameterId,
        eNodeBFunctionName,
        applicationRef,
        enodebId,
        userLabel} =this.enodebFunctionService.cargar();
      this.object = new EnodebFuntion(
        id,
        parameterId,
        eNodeBFunctionName,
        applicationRef,
        enodebId,
        userLabel);
      
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
    const { 
      parameterId,
      eNodeBFunctionName,
      applicationRef,
      enodebId,
      userLabel} = this.object;
    this.form.reset({

        parameterId,
        eNodeBFunctionName,
        applicationRef,
        enodebId,
        userLabel
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.enodebFunctionService.eliminar();
    
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
          eNodeBFunctionName,
          applicationRef,
          enodebId,
          userLabel} = this.form.value;
      
      this.object = new EnodebFuntion(
        id,
        parameterId,
          eNodeBFunctionName,
          applicationRef,
          enodebId,
          userLabel);

      this.enodebFunctionService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
