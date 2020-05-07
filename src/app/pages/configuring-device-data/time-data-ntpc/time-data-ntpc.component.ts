import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { Ntpc } from '../../../models/configurin-device-data/ntpc.model';
import { TimeDataNtpcServiceService } from '../../../services/configuring-device-data/time-data-ntpc-service.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-time-data-ntpc',
  templateUrl: './time-data-ntpc.component.html',
  styles: [
  ]
})
export class TimeDataNtpcComponent implements OnInit {
  ipPattern: string = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  sidebarIdCommand: number[] = [103, 104];
  idEditar: number;
  editarBoolean: boolean = false;
  form: FormGroup;
  array: Ntpc[] = [];
  object: Ntpc;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private timeDataNtpcServiceService: TimeDataNtpcServiceService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    let i = 0;

    this.form = this.fb.group({
      parameterId: new FormControl(null),
      mode: [],
      ip: ['',[Validators.required, Validators.pattern(this.ipPattern)]],
      ipv6: [],
      port: [],
      synccycle: [],
      authmode: [],
      key: [],
      keyid: [],
    });
    this.form.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });

    if (this.timeDataNtpcServiceService.cargar()) {
      this.timeDataNtpcServiceService.cargar().map(({ id,
        parameterId,
        mode,
        ip,
        ipv6,
        port,
        synccycle,
        authmode,
        key,
        keyid
      }) => {
        this.array.push(new Ntpc(
          id,
          parameterId,
          mode,
          ip,
          ipv6,
          port,
          synccycle,
          authmode,
          key,
          keyid
        ));
      });
      this.array.map((iterator) => {

        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
          }));
      })
    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  guardar() {
    if (!this.form.invalid) {
      const { id, parameterId,
        mode,
        ip,
        ipv6,
        port,
        synccycle,
        authmode,
        key,
        keyid } = this.form.value;


      if (!this.editarBoolean) {
        let index: number = 0;
        do {
          if (!this.array[index]) {
            this.array.push(new Ntpc(
              this.sidebarIdCommand[index],
              parameterId,
              mode,
              ip,
              ipv6,
              port,
              synccycle,
              authmode,
              key,
              keyid,
            ));
            break;
          }
          index++;
        } while (index <= this.array.length);


      } else {
        this.array.map((item) => {
          if (item.id === this.idEditar) {
            item.parameterId = parameterId;

            item.mode = mode;
            item.ip = ip;
            item.ipv6 = ipv6;
            item.port = port;
            item.synccycle = synccycle;
            item.authmode = authmode;
            item.key = key;
            item.keyid = keyid;
          }
        });

      }

      this.timeDataNtpcServiceService.guardar(this.array);
      for (const iterator of this.array) {

        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
          }));
      }
      this.form.reset();
      this.editarBoolean = false;
    }

  }

  borrar(id: number) {
    for (const item of this.array) {
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id, '//')
        }));
    }

    this.array =
      this.array
        .filter((item) => item.id !== id);
    let index = 0;
    for (const item of this.array) {
      item.id = this.sidebarIdCommand[index++];
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id, item.Command)
        }))

    }

    this.timeDataNtpcServiceService.guardar(this.array);


  }

  editar(_id: number) {
    this.idEditar = _id;
    const { parameterId,
      mode,
      ip,
      ipv6,
      port,
      synccycle,
      authmode,
      key,
      keyid } =
      this.array.filter(
        obj => obj.id === _id
      )[0];

    this.form.reset({
      parameterId,
      mode,
      ip,
      ipv6,
      port,
      synccycle,
      authmode,
      key,
      keyid
    });


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editarBoolean = true;
  }

  duplicar(_id: number) {
    if (this.array.length < 3) {
      const { parameterId,
        mode,
        ip,
        ipv6,
        port,
        synccycle,
        authmode,
        key,
        keyid } =
        this.array.filter(
          obj => obj.id === _id
        )[0];
      let index: number = 0;
      do {
        if (!this.array[index]) {
          this.array.push(new Ntpc(
            this.sidebarIdCommand[index],
            parameterId,
            mode,
            ip,
            ipv6,
            port,
            synccycle,
            authmode,
            key,
            keyid
          ));
          break;
        }
        index++;
      } while (index <= this.array.length);
      this.timeDataNtpcServiceService.guardar(this.array);
      for (const iterator of this.array) {
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id, iterator.Command)
          }));
      }

    }
  }

  get ipValid() {
    return this.form.get('ip').invalid && this.form.get('ip').touched;
  }
}
