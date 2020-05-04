import { Injectable } from '@angular/core';

import { LocationInformation } from '../../models/configurinBasicData/locationInformation.model';

@Injectable({
  providedIn: 'root'
})
export class LocationInformationService {

  constructor() { }
  guardarLocationInformation(locationInformation: LocationInformation[]){
    localStorage.setItem('locationInformation',JSON.stringify(locationInformation));
  }

  
  
  cargarLocationInformation():LocationInformation[]{
    
      return (localStorage.getItem('locationInformation'))? 
            JSON.parse( localStorage.getItem('locationInformation')):
            []     
    
  }
}
