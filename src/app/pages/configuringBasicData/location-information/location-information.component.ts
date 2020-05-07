import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions/index';

import { LocationInformation } from '../../../models/configurinBasicData/locationInformation.model';
import { LocationInformationService } from '../../../services/configBasicData/location-information.service';
import { SidebarCommand } from 'src/app/models/sidebarCommand/sidebarCommand.model';

@Component({
  selector: 'app-location-information',
  templateUrl: './location-information.component.html',
  styles: [
  ]
})
export class LocationInformationComponent implements OnInit, OnDestroy {
  parametersId: string[] = ['REFERENCE', 'CREATE', 'DELETE'];
  sidebarIdCommand: number[] = [33, 34, 35];
  idEditar:number;
  locationInformationSubscription: Subscription;
  editar: boolean = false;
  locationInformationForm: FormGroup;
  locationInformationArray: LocationInformation[] = [];
  locationInformationObject: LocationInformation;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private locationInformationService: LocationInformationService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    let i =0;
    
    this.locationInformationForm = this.fb.group({
      parameterId: new FormControl(null),
      locationName: [],
      gcdf: [],
      latitudeGFormat: [],
      longitudeGFormat: [],
      latitudeSecFormat: [],
      longitudeSecFormat: [],
      locationId: [],
      altitude: [],
      range: [],
      city: [],
      region: [],
      address: [],
      office: [],
      contact: [],
      telephone: [],
      userLabel: [],
      precise: [],
    });
    this.locationInformationForm.controls['parameterId'].setValue('REFERENCE', { onlySelf: true });
     
    if(this.locationInformationService.cargarLocationInformation()){
      this.locationInformationService.cargarLocationInformation().map(({id, parameterId,
        locationName,
        gcdf,
        latitudeGFormat,
        longitudeGFormat,
        latitudeSecFormat,
        longitudeSecFormat,
        locationId,
        altitude,
        range,
        city,
        region,
        address,
        office,
        contact,
        telephone,
        userLabel,
        precise })=>{
          this.locationInformationArray.push(new LocationInformation(
            id,
            parameterId,
            locationName,
            gcdf,
            latitudeGFormat,
            longitudeGFormat,
            latitudeSecFormat,
            longitudeSecFormat,
            locationId,
            altitude,
            range,
            city,
            region,
            address,
            office,
            contact,
            telephone,
            userLabel,
            precise
          ));
      });
       this.locationInformationArray.map( (iterator)=>{
         
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
          }));
      })
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  guardarLocationInformation() {



    const { parameterId,
      locationName,
      gcdf,
      latitudeGFormat,
      longitudeGFormat,
      latitudeSecFormat,
      longitudeSecFormat,
      locationId,
      altitude,
      range,
      city,
      region,
      address,
      office,
      contact,
      telephone,
      userLabel,
      precise } = this.locationInformationForm.value;


    if (!this.editar) {
      let index:number = 0;
      do {
        if(!this.locationInformationArray[index]){
          this.locationInformationArray.push(new LocationInformation(
            this.sidebarIdCommand[index],
            parameterId,
            locationName,
            gcdf,
            latitudeGFormat,
            longitudeGFormat,
            latitudeSecFormat,
            longitudeSecFormat,
            locationId,
            altitude,
            range,
            city,
            region,
            address,
            office,
            contact,
            telephone,
            userLabel,
            precise
          ));
          break;
        }
        index++;
      } while (index <= this.locationInformationArray.length);
      

    } else {
      this.locationInformationArray.map((locationInformationObject)=>{
          if(locationInformationObject.id === this.idEditar) { 
            locationInformationObject.parameterId = parameterId;
            locationInformationObject.locationName = locationName;
            locationInformationObject.gcdf = gcdf;
            locationInformationObject.latitudeGFormat = latitudeGFormat;
            locationInformationObject.longitudeGFormat = longitudeGFormat;
            locationInformationObject.latitudeSecFormat = latitudeSecFormat;
            locationInformationObject.locationId = locationId;
            locationInformationObject.altitude = altitude;
            locationInformationObject.range = range;
            locationInformationObject.city = city;
            locationInformationObject.region = region;
            locationInformationObject.address = address;
            locationInformationObject.office=office;
            locationInformationObject.contact=contact;
            locationInformationObject.telephone=telephone;
            locationInformationObject.userLabel=userLabel;
            locationInformationObject.precise= precise;
          }
        });
          /*for (const locationInformationObject of this.locationInformationArray) {
            if(locationInformationObject.id === this.idEditar) { 
              locationInformationObject.parameterId = parameterId;
              locationInformationObject.locationName = locationName;
              locationInformationObject.gcdf = gcdf;
              locationInformationObject.latitudeGFormat = latitudeGFormat;
              locationInformationObject.longitudeGFormat = longitudeGFormat;
              locationInformationObject.latitudeSecFormat = latitudeSecFormat;
              locationInformationObject.locationId = locationId;
              locationInformationObject.altitude = altitude;
              locationInformationObject.range = range;
              locationInformationObject.city = city;
              locationInformationObject.region = region;
              locationInformationObject.address = address;
              locationInformationObject.office=office;
              locationInformationObject.contact=contact;
              locationInformationObject.telephone=telephone;
              locationInformationObject.userLabel=userLabel;
              locationInformationObject.precise= precise;

            }
          }*/
          
        
        
      }
    
    this.locationInformationService.guardarLocationInformation(this.locationInformationArray);
    for (const iterator of this.locationInformationArray) {
      
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
        }));
    }
    this.locationInformationForm.reset();
    this.editar = false;


  }
  
  borrarLocationInformation(id: number) {
    for (const item of this.locationInformationArray) {
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id,'//')
        }));
    }
    
    this.locationInformationArray= 
    this.locationInformationArray
      .filter((item)=> item.id !== id );
    let index = 0;
    for (const item of this.locationInformationArray) {
      item.id = this.sidebarIdCommand[index++];
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(item.id,item.Command)
        }))
      
    }

    this.locationInformationService.guardarLocationInformation(this.locationInformationArray);
    /*for (const iterator of this.locationInformationArray) {
      this.store.dispatch(
        actions.editarSidebarCommand({
          sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
        }));
    }*/

  }

  editarLocationInformation(_id: number) {
    this.idEditar = _id;
    const { parameterId,
      locationName,
      gcdf,
      latitudeGFormat,
      longitudeGFormat,
      latitudeSecFormat,
      longitudeSecFormat,
      locationId,
      altitude,
      range,
      city,
      region,
      address,
      office,
      contact,
      telephone,
      userLabel,
      precise } =
      this.locationInformationArray.filter(
        obj => obj.id === _id
      )[0];

    this.locationInformationForm.reset({ parameterId,
      locationName,
      gcdf,
      latitudeGFormat,
      longitudeGFormat,
      latitudeSecFormat,
      longitudeSecFormat,
      locationId,
      altitude,
      range,
      city,
      region,
      address,
      office,
      contact,
      telephone,
      userLabel,
      precise });


    //this.clearExample();
    //this.clearMmeIp();

    //example.forEach(valor => {this.examples.push(this.fb.control(valor,[ Validators.required]));})
    //mmeIp.forEach(valor => {this.mmeIps.push(this.fb.control(valor,[ Validators.pattern(this.ipPattern)]));})
    this.editar = true;
  }

  duplicarLocationInformation(_id: number) {
    if(this.locationInformationArray.length < 3){
      const { parameterId,
        locationName,
        gcdf,
        latitudeGFormat,
        longitudeGFormat,
        latitudeSecFormat,
        longitudeSecFormat,
        locationId,
        altitude,
        range,
        city,
        region,
        address,
        office,
        contact,
        telephone,
        userLabel,
        precise } =
        this.locationInformationArray.filter(
          obj => obj.id === _id
        )[0];
        let index:number = 0;
        do {
          if(!this.locationInformationArray[index]){
            this.locationInformationArray.push(new LocationInformation(
              this.sidebarIdCommand[index],
              parameterId,
              locationName,
              gcdf,
              latitudeGFormat,
              longitudeGFormat,
              latitudeSecFormat,
              longitudeSecFormat,
              locationId,
              altitude,
              range,
              city,
              region,
              address,
              office,
              contact,
              telephone,
              userLabel,
              precise
            ));
            break;
          }
          index++;
        } while (index <= this.locationInformationArray.length);
      this.locationInformationService.guardarLocationInformation(this.locationInformationArray);
      for (const iterator of this.locationInformationArray) {
        this.store.dispatch(
          actions.editarSidebarCommand({
            sidebarCommand: new SidebarCommand(iterator.id,iterator.Command)
          }));
      }
      /*this.radioParameterObject=new RadioParameters(
        new Date().getUTCMilliseconds(),
          cell,
          tx_rx_mode,
          pci,
          downlinkEarfcn/*,
          example);*/
     /* this.store.dispatch(
        radioParametersAction.crearRadioParameters({
          radioParameter: this.radioParameterObject
        }));
      this.radioParameterService.guardarRadioParameters(this.radioParametersObject);*/
    }
  }

}
