import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit	 {

  constructor(private clientesService :ClientesService, private router : Router) { }

  clientes : Cliente[];

  ngOnInit(){}

  ionViewWillEnter	() {

    this.clientesService.getClientes().subscribe(data => {this.clientes = data, console.log("Clientes", data)});

  }

  /**
   * Redirecciona la ruta a la vista de creación de un nuevo cliente
   */
  onCrearCliente():void{
    this.router.navigate(['/clientes',0]);
  }
}
