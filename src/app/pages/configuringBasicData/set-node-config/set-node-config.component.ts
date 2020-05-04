import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { SetNodeConfig } from '../../../models/configurinBasicData/setNodeb.model';
import { SetNodeConfigService } from '../../../services/configBasicData/set-node-config.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-set-node-config',
  templateUrl: './set-node-config.component.html',
  styles: [
  ]
})
export class SetNodeConfigComponent implements OnInit, OnDestroy {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editar: boolean = false;
  setNodeConfigForm: FormGroup;
  setNodeConfigObject : SetNodeConfig;
  neName:string;
  setNodeConfigSubscription: Subscription;
  sidebarCommand:number = 28;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private setNodeConfigService:SetNodeConfigService) { }

  ngOnInit(): void {
    this.setNodeConfigSubscription=this.store.select('configData').subscribe(({configDataObject}) =>{
      this.neName= configDataObject.ne;
  
    });
    this.setNodeConfigForm = this.fb.group({
      parameterId:  new FormControl(null),
      puductType: ['', ],
      userLabel: ['', ],
      nermVersion: ['', ],
      nodeId: ['', ],
      nodeName: [this.neName, ],
      workingMode: ['', ]
    });
    this.setNodeConfigForm.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.setNodeConfigService.cargarSetNodeConfig()){
      const { id,
        parameterId,
        puductType,
        userLabel,
        nermVersion,
        nodeId,
        nodeName,
        workingMode} =this.setNodeConfigService.cargarSetNodeConfig();
      this.setNodeConfigObject = new SetNodeConfig(
          id,
          parameterId,
          puductType,
          userLabel,
          nermVersion,
          nodeId,
          this.neName,
          workingMode);
      
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(this.sidebarCommand,this.setNodeConfigObject.Command)
          }));

        
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    this.setNodeConfigSubscription?.unsubscribe();
  }
  
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  editarSetNodeConfigObject() {
    const { id,
      parameterId,
      puductType,
      userLabel,
      nermVersion,
      nodeId,
      nodeName,
      workingMode} = this.setNodeConfigObject;
    this.setNodeConfigForm.reset({
      
        id,
        parameterId,
        puductType,
        userLabel,
        nermVersion,
        nodeId,
        nodeName: this.neName,
        workingMode
    });
    this.setNodeConfigForm.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editar = true;
  }

  eliminarSetNodeConfigObject() {
    this.setNodeConfigObject = null;
    this.setNodeConfigService.eliminarSetNodeConfig();
    
    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(this.sidebarCommand,'//')
      }));
  }

  guardarSetNodeConfigObject() {
    //console.log(this.dhcpswForm.value);

   /* if (this.configDataForm.invalid) {
      return Object.values(this.configDataForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {
*/
      let id;
      (!this.editar) ?
        id = this.sidebarCommand :
        id = this.setNodeConfigObject.id;

        const { 
          parameterId,
          puductType,
          userLabel,
          nermVersion,
          nodeId,
          nodeName,
          workingMode} = this.setNodeConfigForm.value;
      
      this.setNodeConfigObject = new SetNodeConfig(
        id,
        parameterId,
        puductType,
        userLabel,
        nermVersion,
        nodeId,
        this.neName,
        workingMode);

      this.setNodeConfigService.guardarSetNodeConfig(this.setNodeConfigObject);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.setNodeConfigObject.Command)
        }));


      this.setNodeConfigForm.reset();
      this.editar = false;

  }
}
