import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import { RadioParameters } from '../models/initiallyConfig/radio-parameters.model';

export interface AppState {
   configData: reducers.ConfigDataState ,
   ipNodeRelated: reducers.IpNodeRelatedState,
   radioParameters: RadioParameters[]
}



export const appReducers: ActionReducerMap<AppState> = {
    configData: reducers.configDataReducer ,
    ipNodeRelated: reducers.ipNodeRelatedReducer ,
    radioParameters: reducers.radioParametersReducer
}