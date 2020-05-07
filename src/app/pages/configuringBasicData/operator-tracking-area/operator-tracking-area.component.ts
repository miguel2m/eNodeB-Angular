import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { OperatorTrackingAreaService } from '../../../services/configBasicData/operator-tracking-area.service';
import { OperatorTrackingArea } from '../../../models/configurinBasicData/operatorTrackingArea.model';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-operator-tracking-area',
  templateUrl: './operator-tracking-area.component.html',
  styles: [
  ]
})
export class OperatorTrackingAreaComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : OperatorTrackingArea;
  
  subscripcion: Subscription;
  sidebarCommand:number = 54;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private operatorTrackingAreaService:OperatorTrackingAreaService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      trackingAreaId: [],
      cnOperatorId: [],
      tac: []
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.operatorTrackingAreaService.cargar()){
      const { id,
        parameterId,
        trackingAreaId,
        cnOperatorId,
        tac} =this.operatorTrackingAreaService.cargar();
      this.object = new OperatorTrackingArea(
        id,
        parameterId,
        trackingAreaId,
        cnOperatorId,
        tac);
      
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
      trackingAreaId,
      cnOperatorId,
      tac} = this.object;
    this.form.reset({
      parameterId,
      trackingAreaId,
      cnOperatorId,
      tac
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.operatorTrackingAreaService.eliminar();
    
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
          trackingAreaId,
          cnOperatorId,
          tac} = this.form.value;
      
      this.object = new OperatorTrackingArea(
        id,
        parameterId,
          trackingAreaId,
          cnOperatorId,
          tac);

      this.operatorTrackingAreaService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
