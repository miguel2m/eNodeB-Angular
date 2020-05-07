import { Injectable } from '@angular/core';
import { Ntpc } from '../../models/configurin-device-data/ntpc.model';

@Injectable({
  providedIn: 'root'
})
export class TimeDataNtpcServiceService {

  constructor() { }
  guardar(ntpc: Ntpc[]){
    localStorage.setItem('ntpcDeviceData',JSON.stringify(ntpc));
  }

  
  
  cargar():Ntpc[]{
    
      return (localStorage.getItem('ntpcDeviceData'))? 
            JSON.parse( localStorage.getItem('ntpcDeviceData')):
            []     
    
  }
}
