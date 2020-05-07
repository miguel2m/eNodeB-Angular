import { Injectable } from '@angular/core';
import { Cabinet } from '../../models/configurin-device-data/cabinet.model';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  constructor() { }
  guardar(cabinet: Cabinet){
    localStorage.setItem('cabinetDeviceData',JSON.stringify(cabinet));
  }

  eliminar(){
    localStorage.removeItem('cabinetDeviceData');
  }
  
  cargar(){
    return (localStorage.getItem('cabinetDeviceData'))? 
            JSON.parse( localStorage.getItem('cabinetDeviceData')):
            null  
  }
}
