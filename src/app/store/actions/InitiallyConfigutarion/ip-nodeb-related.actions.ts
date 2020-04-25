import { createAction, props } from '@ngrx/store';
import { IpNodebRelated } from 'src/app/models/initiallyConfig/ip-nodeb-related.model';


export const crearIpNodebRelated = createAction(
    '[ipNodebRelated Component] Crea Ip Nodeb Related',
    props<{ipNodebRelated: IpNodebRelated}>()
);

export const borrarIpNodebRelated= createAction(
    '[ipNodebRelated Component] Borrar Ip Nodeb Related'
);