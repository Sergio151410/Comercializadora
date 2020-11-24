import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ObservadorService} from 'src/app/services/observador.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css']
})



export class ItemVentaComponent implements OnInit {
  
  @Input() flagVenta;

  frutas: IFruta[] = [
    {id: 1, nombre: 'Naranja', precio: 30.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Guayaba', precio: 10.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Uva', precio: 32.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Sandia', precio: 10.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Durazno', precio: 20.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Fresa', precio: 20.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Mandarina', precio: 25.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Jitomate', precio: 34.0, imagen: '../../assets/img/fresa.jpg'}
  ];
  
  venta: IVenta[] = [];
  gTotal: number = 0;
  index:number = 0;

  constructor(public dialog: MatDialog) {
   }
  

  ngOnInit(): void { 
    console.log(this.flagVenta);
    this.creaVenta(this.flagVenta);
    this.validaLocalStorage();
  }


  creaVenta(noVenta) {
    this.flagVenta = 'v'+(parseInt(noVenta)+1);
    console.log('Estoy en la venta {}',this.flagVenta);
  }
  

  validaLocalStorage() {
     if (localStorage.getItem(this.flagVenta) !== undefined && localStorage.getItem(this.flagVenta)) {
      let tmpV = JSON.parse(localStorage.getItem(this.flagVenta));
      this.venta = JSON.parse(localStorage.getItem(this.flagVenta))[0];
      this.gTotal = tmpV[1];
    }
  }
  async verFruta(e, fruta) {
    this.muestraModal(fruta);
  }

  async muestraModal(fruta:IFruta)   {
    const { value: formValues } = await Swal.fire({
      title: fruta.nombre,
      html:
        '<img src="'+fruta.imagen+'" class="frutaImg" style="width:200px;">' +
        '<br>'+
        '<h3>Ingresa el precio de venta:</h3>' +
        '<input id="precioInput" class="swal2-input">' +
        '<h3>Ingresa la cantidad de Kg:</h3>' +
        '<input id="cantidadInput" class="swal2-input" style="width:50px;">' +
        '<div> <label>Utilizar precio actual: <strong>$'+fruta.precio+'</strong></label> '+
        '<input type="checkbox" id="flagPrecioActual" class="swal2-input"/> </div>'
        ,
      focusConfirm: false,
      preConfirm: () => {
        let precio = (document.getElementById("precioInput") as HTMLTextAreaElement).value; 
        let cantidad = (document.getElementById("cantidadInput") as HTMLTextAreaElement).value; 
        let precioActual = (document.getElementById("flagPrecioActual") as HTMLTextAreaElement).value; 
        return [
          precio,
          cantidad,
          precioActual
        ]
      }
    })
    
    if (formValues) {
      this.agregarCanasta(formValues, fruta);
      this.setLocalStorageVenta();
    }
  }

  agregarCanasta(formValues:string[], fruta:IFruta) {
    let costo = parseInt(formValues[0]);
    let cantidad = parseInt(formValues[1]);
    let total = costo * cantidad;
    let id = this.index;
    let row:IVenta = {
      id: id,
      fruta: fruta,
      costo: costo,
      cantidad : cantidad,
      total: total
    }
    if (this.exist(fruta)) {
      console.log(this.venta);
      console.log(this.findId(fruta));
      let id = this.findId(fruta);
      
      
    } else {
      this.venta.push(row);
      this.index++;
    }

    
    this.granTotal();
  }

  vaciarCanasta() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se quitaran los productos agregados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Limpiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.venta = [];
        this.eliminarLocalStorage();
        Swal.fire(
          'Canasta vacia',
          'Se han quitado los productos',
          'success'
        )
      }
    });
  }
  
  exist(fruta:IFruta){
      let nombre = fruta.nombre;
      let is = false;
      this.venta.forEach(element => {
        if (element.fruta.nombre === nombre) {
          is = true;
        }
      });
      return is;
  }

  findId(fruta:IFruta){
    let nombre = fruta.nombre;
    let index;
    this.venta.forEach(element => {
      if (element.fruta.nombre === nombre) {
        index = element.id;
      }
    });
    return index;
}


  granTotal() {
    this.venta.forEach(i => this.gTotal+=i.costo);
  }

  setLocalStorageVenta() {
    let tmp = [];
    tmp.push(this.venta);
    tmp.push(this.gTotal);
    localStorage.setItem(this.flagVenta, JSON.stringify(tmp));
  }
  eliminarLocalStorage() {
    if (localStorage.getItem(this.flagVenta) !== undefined && localStorage.getItem(this.flagVenta)) {
      localStorage.removeItem(this.flagVenta);
  }
}
eliminarProducto(v:IVenta) {
  Swal.fire({
    title: '¿Eliminar este producto?',
    text: 'Se quitara ' + v.fruta.nombre + ' de la canasta',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      let index;
      this.venta.forEach((element, i) => {
      if (element === v) {
       index = i;
       this.venta.splice(index, 1);
       }
      });
      this.setLocalStorageVenta();
      Swal.fire(
        'Realizado',
        'Se han quitado el producto',
        'success'
      )
    }
  });
}
resumenVenta() {
  let dialogRef = this.dialog.open(ResumenComponent, {
    data: {detalle: this.venta},
    });
  }
  }


export interface IFruta {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
}

export interface IVenta {
id: number;
fruta: IFruta;
costo: number;
cantidad: number;
total: number;
}