import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { OperatorCnService } from '../../../services/configBasicData/operator-cn.service';
import { OperatorCn } from '../../../models/configurinBasicData/operatorCn.model';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-operator-cn',
  templateUrl: './operator-cn.component.html',
  styles: [
  ]
})
export class OperatorCnComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : OperatorCn;
  
  subscripcion: Subscription;
  sidebarCommand:number = 50;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private operatorCnService:OperatorCnService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      cnOperatorId: [],
      cnOperatorName: [],
      cnOperatorType: [],
      mcc: [],
      mnc: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.operatorCnService.cargar()){
      const { id,
        parameterId,
        cnOperatorId,
        cnOperatorName,
        cnOperatorType,
        mcc,
        mnc} =this.operatorCnService.cargar();
      this.object = new OperatorCn(
        id,
        parameterId,
        cnOperatorId,
        cnOperatorName,
        cnOperatorType,
        mcc,
        mnc);
      
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
        cnOperatorId,
        cnOperatorName,
        cnOperatorType,
        mcc,
        mnc} = this.object;
    this.form.reset({
      parameterId,
        cnOperatorId,
        cnOperatorName,
        cnOperatorType,
        mcc,
        mnc
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.operatorCnService.eliminar();
    
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
            cnOperatorId,
            cnOperatorName,
            cnOperatorType,
            mcc,
            mnc} = this.form.value;
      
      this.object = new OperatorCn(
        id,
        parameterId,
          cnOperatorId,
          cnOperatorName,
          cnOperatorType,
          mcc,
          mnc);

      this.operatorCnService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
