import { createAction, props } from '@ngrx/store';
import { SidebarCommand } from '../../../models/sidebarCommand/sidebarCommand.model';

export const crearSidebarCommand = createAction(
    '[Sidebar Component] Crea Sidebar Command',
    props<{sidebarCommand: SidebarCommand}>()
);

export const cargarSidebarCommand= createAction(
    '[Sidebar Component] Cargar Sidebar Command',
    props<{sidebarCommand: SidebarCommand[]}>()
);

export const editarSidebarCommand= createAction(
    '[Sidebar Component] Editar Sidebar Command',
    props<{sidebarCommand: SidebarCommand}>()
);
