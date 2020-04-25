import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitConfigComponent } from './pages/initiallyConfig/init-config.component';
import { pagesRoutes } from './pages/pages.routes';


const routes: Routes = [
  {
    path: '', 
    component: InitConfigComponent,
    children: pagesRoutes
    
  },
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
