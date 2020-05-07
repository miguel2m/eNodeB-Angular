import { Injectable } from '@angular/core';
import { Subrack } from '../../models/configurin-device-data/subrack.model';

@Injectable({
  providedIn: 'root'
})
export class SubrackService {

  constructor() { }

  guardar(subrack: Subrack){
    localStorage.setItem('subrackDeviceData',JSON.stringify(subrack));
  }

  eliminar(){
    localStorage.removeItem('subrackDeviceData');
  }
  
  cargar(){
    return (localStorage.getItem('subrackDeviceData'))? 
            JSON.parse( localStorage.getItem('subrackDeviceData')):
            null  
  }
}
