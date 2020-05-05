import { Injectable } from '@angular/core';
import { OperatorTrackingArea } from '../../models/configurinBasicData/operatorTrackingArea.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorTrackingAreaService {

  constructor() { }
  guardar(operatorTrackingArea: OperatorTrackingArea){
    localStorage.setItem('operatorTrackingArea',JSON.stringify(operatorTrackingArea));
  }

  eliminar(){
    localStorage.removeItem('operatorTrackingArea');
  }
  
  cargar(){
    return (localStorage.getItem('operatorTrackingArea'))? 
            JSON.parse( localStorage.getItem('operatorTrackingArea')):
            null  
  }
}
