import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/sidebar/sidebar.actions';

import { NeConfigAttributes } from '../../../models/configurinBasicData/neConfigAttributes.model';
import { NeConfigAttributesService } from '../../../services/configBasicData/ne-config-attributes.service';

import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';



@Component({
  selector: 'app-ne-config-attributes',
  templateUrl: './ne-config-attributes.component.html',
  styles: [
  ]
})
export class NeConfigAttributesComponent implements OnInit, OnDestroy {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editar: boolean = false;
  neConfigAttributesForm: FormGroup;
  neConfigAttributesObject : NeConfigAttributes;
  neName:string;
  configDataSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private neConfigAttributesService:NeConfigAttributesService) { }
    
  ngOnInit(): void {
    this.configDataSubscription=this.store.select('configData').subscribe(({configDataObject}) =>{
      this.neName= configDataObject.ne;
  
    });
    this.neConfigAttributesForm = this.fb.group({
      parameterId:  new FormControl(null),
      neName: [this.neName, ],
      location: ['', ],
      did: ['', ],
      siteName: [this.neName, ],
      userLabel: ['', ],
    });
    this.neConfigAttributesForm.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.neConfigAttributesService.cargarNeConfigAttributes()){
      const { id,
        parameterId,
        neName,
        location,
        did,
        siteName,
        userLabel } =this.neConfigAttributesService.cargarNeConfigAttributes();
      this.neConfigAttributesObject = new NeConfigAttributes(
          id,
          parameterId,
          this.neName,
          location,
          did,
          this.neName,
          userLabel);
      
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(24,this.neConfigAttributesObject.Command)
          }));

        
    }
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.configDataSubscription?.unsubscribe();
  }
  
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  editarNeConfigAttributesObject() {
    const {
      parameterId,
      neName,
      location,
      did,
      siteName,
      userLabel } = this.neConfigAttributesObject;
    this.neConfigAttributesForm.reset({
      parameterId,
      neName,
      location,
      did,
      siteName,
      userLabel
    });
    this.neConfigAttributesForm.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editar = true;
  }

  eliminarNeConfigAttributesObject() {
    this.neConfigAttributesObject = null;
    this.neConfigAttributesService.eliminarNeConfigAttributes();
    
    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(24,'//')
      }));
  }

  guardarNeConfigAttributesObject() {
    //console.log(this.dhcpswForm.value);

   /* if (this.configDataForm.invalid) {
      return Object.values(this.configDataForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {
*/
      let id;
      (!this.editar) ?
        id = 24 :
        id = this.neConfigAttributesObject.id;

        const {
          parameterId,
          neName,
          location,
          did,
          siteName,
          userLabel } = this.neConfigAttributesForm.value;
      
      this.neConfigAttributesObject = new NeConfigAttributes(
        id,
        parameterId,
        this.neName,
          location,
          did,
          this.neName,
          userLabel);

      this.neConfigAttributesService.guardarNeConfigAttributes(this.neConfigAttributesObject);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(24,this.neConfigAttributesObject.Command)
        }));


      this.neConfigAttributesForm.reset();
      this.editar = false;

  }

}
