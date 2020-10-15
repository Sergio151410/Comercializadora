import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [ 
  {
    path: 'cliente', component: ClienteComponent
  },
  {
    path:  'empleado', component: EmpleadoComponent
  },
  {
    path: 'producto', component: ProductoComponent
  },
  {
    path:  'venta', component: VentaComponent
  },
  {
    path:  'principal', component: PrincipalComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }