import { Injectable } from '@angular/core';
import { ConfigData } from '../../models/initiallyConfig/config-data.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {
  configData: ConfigData;
  constructor() {
   
   }

  guardarConfigData(configData: ConfigData){
    localStorage.setItem('configData',JSON.stringify(configData));
  }

  eliminarConfigData(){
    localStorage.removeItem('configData');
  }
  
  cargarConfigData(){
    if(localStorage.getItem('configData')){
      this.configData= JSON.parse( localStorage.getItem('configData'));
      return this.configData;
    }
  }
}
