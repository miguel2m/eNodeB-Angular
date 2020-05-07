import { Injectable } from '@angular/core';
import { MasterNtpc } from '../../models/configurin-device-data/masterNtpc.model';

@Injectable({
  providedIn: 'root'
})
export class TimeDataMasterNtpcServiceService {

  constructor() { }
  guardar(masterNtpc: MasterNtpc){
    localStorage.setItem('masterNtpcDeviceData',JSON.stringify(masterNtpc));
  }

  eliminar(){
    localStorage.removeItem('masterNtpcDeviceData');
  }
  
  cargar(){
    return (localStorage.getItem('masterNtpcDeviceData'))? 
            JSON.parse( localStorage.getItem('masterNtpcDeviceData')):
            null  
  }
}
