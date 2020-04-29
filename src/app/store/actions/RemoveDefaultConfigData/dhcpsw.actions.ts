import { createAction, props } from '@ngrx/store';
import { Dchpsw } from '../../../models/removeDefaultConfigData/dhcpsw.model';

export const crearDhcpsw = createAction(
    '[Dhcpsw Component] Crea Dhcpsw',
    props<{dhcpsw: Dchpsw}>()
);

export const borrarDhcpsw= createAction(
    '[Dhcpsw Component] Borrar Dhcpsw'
);