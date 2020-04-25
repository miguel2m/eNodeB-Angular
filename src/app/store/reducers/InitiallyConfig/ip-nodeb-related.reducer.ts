import { createReducer, on } from '@ngrx/store';
import { crearIpNodebRelated, borrarIpNodebRelated} from '../../actions';
import { IpNodebRelated } from '../../../models/initiallyConfig/ip-nodeb-related.model';

export interface IpNodeRelatedState {
    ipNodeRelatedObject: IpNodebRelated
}

export const ipNodeRelatedInitialState: IpNodeRelatedState = {
    ipNodeRelatedObject: null
}

const _ipNodeRelatedReducer = createReducer(ipNodeRelatedInitialState,

    on(crearIpNodebRelated, (state,{ipNodebRelated}) => ({
        ...state, ipNodeRelatedObject:{...ipNodebRelated}
       })),
   on(borrarIpNodebRelated, (state) =>({
       ...state, ipNodeRelatedObject: null
   }))
   


);

export function ipNodeRelatedReducer (state, action) {
    return _ipNodeRelatedReducer (state, action);
}