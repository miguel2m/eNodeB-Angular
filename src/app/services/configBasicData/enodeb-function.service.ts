import { Injectable } from '@angular/core';
import { EnodebFuntion } from '../../models/configurinBasicData/eNodeBFunction.model';

@Injectable({
  providedIn: 'root'
})
export class EnodebFunctionService {

  constructor() { }

  guardar(enodebFuntion: EnodebFuntion){
    localStorage.setItem('enodebFuntion',JSON.stringify(enodebFuntion));
  }

  eliminar(){
    localStorage.removeItem('enodebFuntion');
  }
  
  cargar(){
    return (localStorage.getItem('enodebFuntion'))? 
            JSON.parse( localStorage.getItem('enodebFuntion')):
            null  
  }
}
