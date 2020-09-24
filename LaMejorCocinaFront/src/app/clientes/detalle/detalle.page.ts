import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Modos } from '../../modos.enum';
import { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import{ FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  constructor(private clientesService :ClientesService,
              private activatedRoute : ActivatedRoute,
              private router : Router, 
              private alertController: AlertController,
              private toastController: ToastController) { }

  //Crea el formulario del cliente
  clienteForm = new FormGroup({
    Nombres            : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido1          : new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Apellido2          : new FormControl('', [Validators.maxLength(200)]),
    Observaciones      : new FormControl('', [Validators.maxLength(1000)]),   
    IdCliente          : new FormControl(0)   

  });

  //idCliente : number= 0;

  //Define si la pagina se carga para creación o edición
  modo : Modos;

  ngOnInit() {
    /**Obtiene los parametros desde la ruta */
    //this.idCliente  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clienteForm.controls["IdCliente"].setValue(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.modo = this.establecerModo(this.clienteForm.controls["IdCliente"].value);
    
    //En modo edición realiza la consulta del cliente
    if(this.modo == Modos.edicion){      
      this.clientesService.getCliente(this.clienteForm.controls["IdCliente"].value).subscribe(data => {
       
        //Carga el formulario con los valores consultados
        this.clienteForm.controls["Nombres"].setValue(data.Nombres);
        this.clienteForm.controls["Apellido1"].setValue(data.Apellido1);
        this.clienteForm.controls["Apellido2"].setValue(data.Apellido2);
        this.clienteForm.controls["Observaciones"].setValue(data.Observaciones);

      }, error => console.log(error));
    }
  }

  enviarForm():void{
    console.log("Form", this.clienteForm.value);    

    //Crear
    if(this.clienteForm.controls["IdCliente"].value == 0)
    {
      this.clientesService.postCliente(this.clienteForm.value).subscribe(data => {
        
        this.mostrarToast("creado");

        //Retorna a la vista de clientes
        this.router.navigate(['/clientes']);
      }, error => {
        console.log("Error", error);
      });
    }
    //Editar
    else {
      
      this.clientesService.putCliente(this.clienteForm.controls["IdCliente"].value, this.clienteForm.value).subscribe(data => {
        
        this.mostrarToast("editado");

        //Retorna a la vista de clientes
        this.router.navigate(['/clientes']);
      }, error => {
        console.log("Error", error);
      });
    }
  }

  /**
   * Establece el modo de configuracion del componente : [edicion, creacion] 
   * @param id 
   */
  establecerModo(idCliente: number):Modos{

    if(idCliente === 0)
      return Modos.creacion
    else 
      return Modos.edicion 
  }

  /** 
   * Elimina el cliente actual
  */
  eliminarCliente(): void{
    this.clientesService.deleteCliente(this.clienteForm.controls["IdCliente"].value).subscribe(data => {
      //Retorna a la vista de clientes
      this.router.navigate(['/clientes']);

    }, error => console.log(error));
  }

  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el cliente?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',         
          handler: (h) => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.eliminarCliente();
            this.mostrarToast("eliminado");
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Muestra mensaje de confirmación de eliminación de usuario
   */
  async mostrarToast(accion : string) {

    const toast = await this.toastController.create({
      message: 'El cliente ' + this.clienteForm.controls["Apellido1"].value + " " + this.clienteForm.controls["Nombres"].value + " ha sido "+ accion +" correctamente",
      duration: 2000
    });
    toast.present();
  }

  


}
