import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdeudoComponent } from './adeudo/adeudo.component';
import { ClienteAMComponent } from './cliente-am/cliente-am.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoAMComponent } from './empleado-am/empleado-am.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductoAMComponent } from './producto-am/producto-am.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [ 
  {
    path: 'cliente', component: ClienteComponent
  },
  {
    path: 'cliente-am', component: ClienteAMComponent
  },
  {
    path:  'empleado', component: EmpleadoComponent
  },
  {
    path:  'empleado-am', component: EmpleadoAMComponent
  },
  {
    path: 'producto', component: ProductoComponent
  },
  {
    path: 'producto-am', component: ProductoAMComponent
  },
  {
    path:  'venta', component: VentaComponent
  },
  {
    path:  'adeudo', component: AdeudoComponent
  },
  {
    path:  'principal', component: PrincipalComponent, pathMatch:'full'
  },
  {
    path: '**', redirectTo: 'principal'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
