import { Injectable } from '@angular/core';
import { OperatorCn } from '../../models/configurinBasicData/operatorCn.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorCnService {

  constructor() { }
  guardar(operatorCn: OperatorCn){
    localStorage.setItem('operatorCn',JSON.stringify(operatorCn));
  }

  eliminar(){
    localStorage.removeItem('operatorCn');
  }
  
  cargar(){
    return (localStorage.getItem('operatorCn'))? 
            JSON.parse( localStorage.getItem('operatorCn')):
            null  
  }
}
