import { Injectable } from '@angular/core';
import { Dchpsw } from '../../models/removeDefaultConfigData/dhcpsw.model';

@Injectable({
  providedIn: 'root'
})
export class DhcpswService {

  constructor() { }

  guardarDhcpsw(dhcpsw: Dchpsw){
    localStorage.setItem('dhcpsw',JSON.stringify(dhcpsw));
  }

  eliminarDhcpsw(){
    localStorage.removeItem('dhcpsw');
  }
  
  cargarDhcpsw(){
    return (localStorage.getItem('dhcpsw'))? 
            JSON.parse( localStorage.getItem('dhcpsw')):
            null  
  }
}
