import { Injectable } from '@angular/core';
import { NeConfigAttributes } from '../../models/configurinBasicData/neConfigAttributes.model';

@Injectable({
  providedIn: 'root'
})
export class NeConfigAttributesService {

  constructor() { }

  guardarNeConfigAttributes(neConfigAttributes: NeConfigAttributes){
    localStorage.setItem('neConfigAttributes',JSON.stringify(neConfigAttributes));
  }

  eliminarNeConfigAttributes(){
    localStorage.removeItem('neConfigAttributes');
  }
  
  cargarNeConfigAttributes(){
    return (localStorage.getItem('neConfigAttributes'))? 
            JSON.parse( localStorage.getItem('neConfigAttributes')):
            null  
  }
}
