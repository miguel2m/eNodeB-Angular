import { Injectable } from '@angular/core';
import { NeMaintenaceMode } from '../../models/configurinBasicData/neMainTenanceMode.model';

@Injectable({
  providedIn: 'root'
})
export class NeMainTenanceModeService {

  constructor() { }

  guardar(neMaintenaceMode: NeMaintenaceMode){
    localStorage.setItem('neMaintenaceMode',JSON.stringify(neMaintenaceMode));
  }

  eliminar(){
    localStorage.removeItem('neMaintenaceMode');
  }
  
  cargar(){
    return (localStorage.getItem('neMaintenaceMode'))? 
            JSON.parse( localStorage.getItem('neMaintenaceMode')):
            null  
  }
}
