import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AdeudoComponent } from './components/adeudo/adeudo.component';
import { ClienteAMComponent } from './components/cliente-am/cliente-am.component';
import { EmpleadoAMComponent } from './components/empleado-am/empleado-am.component';
import { ProductoAMComponent } from './components/producto-am/producto-am.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';




@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    NavbarComponent,
    EmpleadoComponent,
    ProductoComponent,
    VentaComponent,
    MenuComponent,
    PrincipalComponent,
    AdeudoComponent,
    ClienteAMComponent,
    EmpleadoAMComponent,
    ProductoAMComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
