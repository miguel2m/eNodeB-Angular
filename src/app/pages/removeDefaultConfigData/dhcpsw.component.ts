import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import * as actions  from '../../store/actions/';

import { Dchpsw } from '../../models/removeDefaultConfigData/dhcpsw.model';
import { DhcpswService } from '../../services/removeDefaultConfigData/dhcpsw.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';


@Component({
  selector: 'app-dhcpsw',
  templateUrl: './dhcpsw.component.html',
  styles: [
  ]
})
export class DhcpswComponent implements OnInit, OnDestroy {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  dhcpswSubscription: Subscription;
  editar: boolean = false;
  dchpswObject:Dchpsw;
  dhcpswForm: FormGroup;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private dhcpswService: DhcpswService )
    { }

  ngOnInit(): void {
    this.dhcpswForm = this.fb.group({
      parameterId:  new FormControl(null),
      switchDhcp: ['', ],
      vlanScan: ['', ]
    });
    this.dhcpswForm.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    
    if(this.dhcpswService.cargarDhcpsw()){
      const {id,
        parameterId,
        switchDchpsw,
        vlanScansw} =this.dhcpswService.cargarDhcpsw();
      this.dchpswObject = new Dchpsw(
        id,
        parameterId,
        switchDchpsw,
        vlanScansw);
      
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(8,this.dchpswObject.Command)
          }));
    }
    
    /*if (this.dchpswObject)
    this.store.dispatch(
      dhcpswActions.crearDhcpsw({
        dhcpsw: this.dchpswObject
      }));
    this.dhcpswSubscription=  this.store.select('dhcpws').subscribe(obj => {
      this.dchpswObject = obj.dhcpswObject;
    });*/
  
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dhcpswSubscription?.unsubscribe();
    
  }

  editarDchpsw() {
    const {
      parameterId,
      switchDchpsw,
      vlanScansw } = this.dchpswObject;
    this.dhcpswForm.reset({
      parameterId,
      switchDhcp:switchDchpsw,
      vlanScan: vlanScansw
    });
    this.dhcpswForm.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editar = true;
  }

  eliminarDchpsw() {
    this.dchpswObject = null;
    this.dhcpswService.eliminarDhcpsw();
    /*this.store.dispatch(
      dhcpswActions.borrarDhcpsw()
    );*/
    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(8,'//')
      }));
  }

  guardarDchpsw() {
    //console.log(this.dhcpswForm.value);

   /* if (this.configDataForm.invalid) {
      return Object.values(this.configDataForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {
*/
      let id;
      (!this.editar) ?
        id = 8 :
        id = this.dchpswObject.id;

      const { parameterId,
        switchDhcp,
        vlanScan} = this.dhcpswForm.value;
      
      this.dchpswObject = new Dchpsw(
        id,
        parameterId,
        switchDhcp,
        vlanScan);

      this.dhcpswService.guardarDhcpsw(this.dchpswObject);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(8,this.dchpswObject.Command)
        }));
      /*this.store.dispatch(
        dhcpswActions.crearDhcpsw({
          dhcpsw: this.dchpswObject
        }));*/

      this.dhcpswForm.reset();
      this.editar = false;
      //console.log(this.dchpswObject.Command);
    //}
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}
