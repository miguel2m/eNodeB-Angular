import { Injectable } from '@angular/core';
import { SetNodeConfig } from '../../models/configurinBasicData/setNodeb.model';

@Injectable({
  providedIn: 'root'
})
export class SetNodeConfigService {

  constructor() { }
  guardarSetNodeConfig(setNodeConfig: SetNodeConfig){
    localStorage.setItem('setNodeConfig',JSON.stringify(setNodeConfig));
  }

  eliminarSetNodeConfig(){
    localStorage.removeItem('setNodeConfig');
  }
  
  cargarSetNodeConfig(){
    return (localStorage.getItem('setNodeConfig'))? 
            JSON.parse( localStorage.getItem('setNodeConfig')):
            null  
  }
}
