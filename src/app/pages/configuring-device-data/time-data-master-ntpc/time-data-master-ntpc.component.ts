import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { MasterNtpc } from '../../../models/configurin-device-data/masterNtpc.model';
import { TimeDataMasterNtpcServiceService } from '../../../services/configuring-device-data/time-data-master-ntpc-service.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-time-data-master-ntpc',
  templateUrl: './time-data-master-ntpc.component.html',
  styles: [
  ]
})
export class TimeDataMasterNtpcComponent implements OnInit {
  ipPattern: string = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  editarForm: boolean = false;
  form: FormGroup;
  object: MasterNtpc;
  sidebarCommand: number = 107;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private timeDataMasterNtpcServiceService: TimeDataMasterNtpcServiceService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      parameterId: new FormControl(null),
      mode: [],
      ip: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      ipv6: [],
    });
    this.form.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });
    if (this.timeDataMasterNtpcServiceService.cargar()) {
      const { id,
        parameterId,
        mode, ip, ipv6 } = this.timeDataMasterNtpcServiceService.cargar();
      this.object = new MasterNtpc(
        id,
        parameterId,
        mode, ip, ipv6);

      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand, this.object.Command)
        }));


    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  editar() {
    const { id,
      parameterId,
      mode, ip, ipv6 } = this.object;
    this.form.reset({
      parameterId,
      mode, ip, ipv6
    });
    this.form.controls['parameterId'].setValue(parameterId, { onlySelf: true });
    this.editarForm = true;
  }

  eliminar() {
    this.object = null;
    this.timeDataMasterNtpcServiceService.eliminar();

    this.store.dispatch(
      actions.editarSidebarCommand({
        sidebarCommand: new SidebarCommand(this.sidebarCommand, '//')
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
    if (!this.form.invalid) {
      let id;
      (!this.editarForm) ?
        id = this.sidebarCommand :
        id = this.object.id;

      const {
        parameterId,
        mode, ip, ipv6 } = this.form.value;

      this.object = new MasterNtpc(
        id,
        parameterId,
        mode, ip, ipv6);

      this.timeDataMasterNtpcServiceService.guardar(this.object);
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(this.sidebarCommand, this.object.Command)
        }));


      this.form.reset();
      this.editarForm = false;
    }

  }

  get ipValid() {
    return this.form.get('ip').invalid && this.form.get('ip').touched;
  }

}
