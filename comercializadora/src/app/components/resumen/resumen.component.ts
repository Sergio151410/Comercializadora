import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface IDetalle {
  venta:IVenta[];
}


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  DETALLE_DATA: IDetalle[] = [
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public detalle:{detalle:IVenta[]}) { 
    this.DETALLE_DATA.push({venta: this.detalle.detalle});
  }

  ngOnInit(): void {
    
    console.log('alias '+ JSON.stringify(this.DETALLE_DATA));
  }

  displayedColumns: string[] = ['fruta'];
  dataSource = this.DETALLE_DATA;

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