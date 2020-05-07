import { Injectable } from '@angular/core';
import { TimeDataTz } from '../../models/configurin-device-data/timeDataTz.model';

@Injectable({
  providedIn: 'root'
})
export class TimeDataTzServiceService {

  constructor() { }
  guardar(timeDataTz: TimeDataTz){
    localStorage.setItem('timeDataTz',JSON.stringify(timeDataTz));
  }

  eliminar(){
    localStorage.removeItem('timeDataTz');
  }
  
  cargar(){
    return (localStorage.getItem('timeDataTz'))? 
            JSON.parse( localStorage.getItem('timeDataTz')):
            null  
  }
}
