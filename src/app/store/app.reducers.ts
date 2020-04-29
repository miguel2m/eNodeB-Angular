import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import { RadioParameters } from '../models/initiallyConfig/radio-parameters.model';
import { SidebarCommand } from '../models/sidebarCommand/sidebarCommand.model';

export interface AppState {
   configData     : reducers.ConfigDataState ,
   ipNodeRelated  : reducers.IpNodeRelatedState,
   radioParameters: RadioParameters[],
   dhcpws         : reducers.RemoveDefaultConfigState,
   sidebarCommand : SidebarCommand[]
}



export const appReducers: ActionReducerMap<AppState> = {
    configData     : reducers.configDataReducer ,
    ipNodeRelated  : reducers.ipNodeRelatedReducer ,
    radioParameters: reducers.radioParametersReducer,
    dhcpws         : reducers.dhcpswReducer,
    sidebarCommand : reducers.sidebarCommandReducer
}