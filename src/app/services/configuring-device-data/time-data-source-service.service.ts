import { Injectable } from '@angular/core';
import { TimeDataSource } from '../../models/configurin-device-data/timeDataSource.model';

@Injectable({
  providedIn: 'root'
})
export class TimeDataSourceServiceService {

  constructor() { }
  guardar(timeDataSource: TimeDataSource){
    localStorage.setItem('timeDataSource',JSON.stringify(timeDataSource));
  }

  eliminar(){
    localStorage.removeItem('timeDataSource');
  }
  
  cargar(){
    return (localStorage.getItem('timeDataSource'))? 
            JSON.parse( localStorage.getItem('timeDataSource')):
            null  
  }
}
