import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as configDataActions from '../../../store/actions/InitiallyConfigutarion/config-data.actions';

//MODEL
import { ConfigData } from '../../../models/initiallyConfig/config-data.model';
import { ConfigDataService } from '../../../services/initiallyConfig/config-data.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-data',
  templateUrl: './config-data.component.html',
  styleUrls: ['./config-data.component.css']
})
export class ConfigDataComponent implements OnInit, OnDestroy {
  configDataSubscription: Subscription;
  editar: boolean = false;
  ipPattern: string = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
  configDataForm: FormGroup;
  cargando: boolean = false;

  configDataObject: ConfigData = null;



  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private configDataService: ConfigDataService) { }

  ngOnInit(): void {


    this.configDataForm = this.fb.group({
      ne: ['', Validators.required],
      ethernetPortNumber: ['', [Validators.required]],
      interfazIp: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      maskIp: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      nextHopIp: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      nextHopVlan: ['', [Validators.required, Validators.pattern(this.ipPattern)]]
    });

    
    this.configDataSubscription=  this.store.select('configData').subscribe(obj => {
      this.configDataObject = obj.configDataObject;
    });
  }

  ngOnDestroy(): void {
    //this.configDataSubscription?.unsubscribe();
  }

  get neInvalid() {
    return this.configDataForm.get('ne').invalid && this.configDataForm.get('ne').touched;
  }
  get ethernetPortNumberInvalid() {
    return this.configDataForm.get('ethernetPortNumber').invalid && this.configDataForm.get('ethernetPortNumber').touched;
  }
  get interfazIpInvalid() {
    return this.configDataForm.get('interfazIp').invalid && this.configDataForm.get('interfazIp').touched;
  }
  get maskIpInvalid() {
    return this.configDataForm.get('maskIp').invalid && this.configDataForm.get('maskIp').touched;
  }

  get nextHopIpInvalid() {
    return this.configDataForm.get('nextHopIp').invalid && this.configDataForm.get('nextHopIp').touched;
  }

  get nextHopVlanInvalid() {
    return this.configDataForm.get('nextHopVlan').invalid && this.configDataForm.get('nextHopVlan').touched;
  }

  editarConfigData() {
    const {
      ne,
      ethernetPortNumber,
      interfazIp,
      maskIp,
      nextHopIp,
      nextHopVlan } = this.configDataObject;
    this.configDataForm.reset({
      ne,
      ethernetPortNumber,
      interfazIp,
      maskIp,
      nextHopIp,
      nextHopVlan
    });
    this.editar = true;
  }

  eliminarConfigData() {
    this.configDataObject = null;
    this.configDataService.eliminarConfigData();
    this.store.dispatch(
      configDataActions.borrarConfigData());
  }

  guardarConfigData() {

    if (this.configDataForm.invalid) {
      return Object.values(this.configDataForm.controls).forEach(control => {
        control.markAsTouched();
      });

    } else {

      let id;
      (!this.editar) ?
        id = new Date().getMilliseconds() :
        id = this.configDataObject.id;

      const { ne,
        ethernetPortNumber,
        interfazIp,
        maskIp,
        nextHopIp,
        nextHopVlan } = this.configDataForm.value;

      this.configDataObject = new ConfigData(
        id,
        ne,
        ethernetPortNumber,
        interfazIp,
        maskIp,
        nextHopIp,
        nextHopVlan);

      this.configDataService.guardarConfigData(this.configDataObject);
      this.store.dispatch(
        configDataActions.crearConfigData({
          configData: this.configDataObject
        }));

      this.configDataForm.reset();
      this.editar = false;
      console.log(this.configDataObject);
    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}
