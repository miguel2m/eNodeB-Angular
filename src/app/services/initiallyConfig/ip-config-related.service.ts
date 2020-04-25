import { Injectable } from '@angular/core';
import { IpNodebRelated } from '../../models/initiallyConfig/ip-nodeb-related.model';

@Injectable({
  providedIn: 'root'
})
export class IpConfigRelatedService {
  ipNodebRelated: IpNodebRelated;
  constructor() { }

  guardarIpNodebRelated(ipNodebRelated: IpNodebRelated){
    localStorage.setItem('ipNodebRelated',JSON.stringify(ipNodebRelated));
  }

  eliminarIpNodebRelated(){
    localStorage.removeItem('ipNodebRelated');
  }
  
  cargarIpNodebRelated(){
    if(localStorage.getItem('ipNodebRelated')){
      return  JSON.parse( localStorage.getItem('ipNodebRelated'));      
    }
  }
}
