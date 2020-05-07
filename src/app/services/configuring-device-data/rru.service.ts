import { Injectable } from '@angular/core';
import { Rru } from '../../models/configurin-device-data/rru.model';

@Injectable({
  providedIn: 'root'
})
export class RruService {

  constructor() { }
  guardar(rru: Rru[]){
    localStorage.setItem('rruDeviceData',JSON.stringify(rru));
  }

  
  
  cargar():Rru[]{
    
      return (localStorage.getItem('rruDeviceData'))? 
            JSON.parse( localStorage.getItem('rruDeviceData')):
            []     
    
  }
}
