import { Injectable } from '@angular/core';
import { RruChain } from '../../models/configurin-device-data/rruChain.model';

@Injectable({
  providedIn: 'root'
})
export class RruChainService {

  constructor() { }

  guardarLocationInformation(rruChain: RruChain[]){
    localStorage.setItem('rruChainDeviceData',JSON.stringify(rruChain));
  }

  
  
  cargarLocationInformation():RruChain[]{
    
      return (localStorage.getItem('rruChainDeviceData'))? 
            JSON.parse( localStorage.getItem('rruChainDeviceData')):
            []     
    
  }
}
