import { Injectable } from '@angular/core';
import { RadioParameters } from '../../models/initiallyConfig/radio-parameters.model';

@Injectable({
  providedIn: 'root'
})
export class RadioParameterService {

  constructor() { }

  guardarRadioParameters(radioParameters: RadioParameters[]){
    localStorage.setItem('radioParameters',JSON.stringify(radioParameters));
  }

  
  
  cargarRadioParameters(){
    
      return (localStorage.getItem('radioParameters'))? 
            JSON.parse( localStorage.getItem('radioParameters')):
            []     
    
  }
}
