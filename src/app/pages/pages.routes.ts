import { Routes } from '@angular/router';
import { InitConfigComponent } from './initiallyConfig/init-config.component';
import { DhcpswComponent } from './removeDefaultConfigData/dhcpsw.component';

export const pagesRoutes: Routes =[
    
    {path :'', component: InitConfigComponent},
    {path :'dhcpsw', component: DhcpswComponent},
    {path: '**', redirectTo:''}
];