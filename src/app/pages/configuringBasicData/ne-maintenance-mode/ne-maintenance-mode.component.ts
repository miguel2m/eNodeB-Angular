import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { NeMaintenaceMode } from '../../../models/configurinBasicData/neMainTenanceMode.model';
import { NeMainTenanceModeService } from '../../../services/configBasicData/ne-main-tenance-mode.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-ne-maintenance-mode',
  templateUrl: './ne-maintenance-mode.component.html',
  styles: [
  ]
})
export class NeMaintenanceModeComponent implements OnInit {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object : NeMaintenaceMode;
  
  subscripcion: Subscription;
  sidebarCommand:number = 45;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private neMainTenanceModeService:NeMainTenanceModeService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterId:  new FormControl(null),
      mntMode: ['', ],
      st: ['', ],
      et: ['', ],
      mmSetRemark: ['', ]
    });
    this.form.controls['parameterId'].setValue('REFERENCE', {onlySelf: true});
    if(this.neMainTenanceModeService.cargar()){
      const { id,
        parameterId,
        mntMode,
        st,
        et,
        mmSetRemark} =this.neMainTenanceModeService.cargar();
      this.object = new NeMaintenaceMode(
        id,
        parameterId,
        mntMode,
        st,
        et,
        mmSetRemark);
      
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
      mntMode,
      st,
      et,
      mmSetRemark} = this.object;
    this.form.reset({
      parameterId,
      mntMode,
      st,
      et,
      mmSetRemark
    });
    this.form.controls['parameterId'].setValue(parameterId, {onlySelf: true});
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.neMainTenanceModeService.eliminar();
    
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
          mntMode,
          st,
          et,
          mmSetRemark} = this.form.value;
      
      this.object = new NeMaintenaceMode(
          id,
          parameterId,
          mntMode,
          st,
          et,
          mmSetRemark);

      this.neMainTenanceModeService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand,this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;

  }

}
