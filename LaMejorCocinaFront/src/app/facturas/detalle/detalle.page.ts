import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Modos } from '../../modos.enum';
import { Factura } from '../../interfaces/factura';
import { Cliente } from '../../interfaces/cliente';
import { Camarero } from '../../interfaces/camarero';
import { Cocinero } from '../../interfaces/cocinero';
import { Mesa } from '../../interfaces/mesa';

import { FacturasService } from '../facturas.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import{ FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ClientesService } from 'src/app/clientes/clientes.service';
import { CamarerosService } from 'src/app/camareros/camareros.service';
import { MesasService } from 'src/app/mesas/mesas.service';
import { CocinerosService } from 'src/app/cocineros/cocineros.service';
import { DetalleFactura } from 'src/app/interfaces/detalle-factura';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  constructor(private facturasService :FacturasService,
              private activatedRoute : ActivatedRoute,
              private router : Router, 
              private alertController: AlertController,
              private toastController: ToastController,
              private clientesService: ClientesService,
              private camarerosService: CamarerosService,
              private mesasService : MesasService,
              private cocinerosService : CocinerosService) { }
 

  //Crea el formulario del factura
  facturaForm = new FormGroup({
    Fecha              : new FormControl(new Date().toISOString(), [Validators.required, Validators.maxLength(200)]),
    IdMesa             : new FormControl(null,       [Validators.required, Validators.maxLength(200)]),
    IdCamarero         : new FormControl(null,       [Validators.required, Validators.maxLength(200)]),
    IdCliente          : new FormControl(null,       [Validators.required, Validators.maxLength(1000)]),   
    IdFactura          : new FormControl(0),
    Total              : new FormControl('0')
  });

  //Define si la pagina se carga para creación o edición
  modo      : Modos;
  clientes  : Cliente [];
  camareros : Camarero [];
  mesas     : Mesa[];
  cocineros : Cocinero[];

  //Almacena los detalles de factura
  detalles : FormGroup[] = [];

  ngOnInit(){}

  ionViewWillEnter () {
      
    console.log("Carga del componente");
    /**Obtiene los parametros desde la ruta */    
    this.facturaForm.controls["IdFactura"].setValue(Number(this.activatedRoute.snapshot.paramMap.get('id')));

    this.modo = this.establecerModo(this.facturaForm.controls["IdFactura"].value);

    /**Consulta los datos necesarios para armar una factura */
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data;
      console.log("Clientes", this.clientes);
    }, error => {
      console.log("Error al cargar los clientes");
    });

    
    this.camarerosService.getCamareros().subscribe(data => {
      this.camareros = data;
      console.log("Camareros", this.camareros);
    }, error => {
      console.log("Error al cargar los camareros");
    });

    this.mesasService.getMesas().subscribe(data => {
      this.mesas = data;
      console.log("Mesas", this.mesas);
    }, error => {
      console.log("Error al cargar las mesas");
    });

    this.cocinerosService.getCocineros().subscribe(data => {
      this.cocineros = data;
      console.log("Cocineros", this.cocineros);
    }, error => {
      console.log("Error al cargar los cocineros");
    });

    //En modo edición realiza la consulta del factura con delay por fallas en los inputs select 
    setTimeout( () => {
      
      if(this.modo == Modos.edicion){      
        this.facturasService.getFactura(this.facturaForm.controls["IdFactura"].value).subscribe(data => {
          
          //Carga el formulario con los valores consultados
          this.facturaForm.controls["Fecha"].setValue(data.Fecha);
          this.facturaForm.controls["IdMesa"].setValue(data.IdMesa);
          this.facturaForm.controls["IdCamarero"].setValue(data.IdCamarero);
          this.facturaForm.controls["IdCliente"].setValue(data.IdCliente);
          this.facturaForm.controls["Total"].setValue(data.Total);

          this.detalles = [];

          //Si hay detalles de factura se deben mostrar
          if(data.DetallesFactura.length > 0){
            
            data.DetallesFactura.forEach(d => {
              this.onAgregarDetalle(d);
            });
          }

        }, error => console.log(error));
      }
    }, 100);
  }

  enviarForm():void{
    console.log("Form", this.facturaForm.value);    

    //Formatea los elementos a guardar
    var factura : Factura = this.facturaForm.value;

    //Inicializa el arreglo 
    factura.DetallesFactura = [];

    this.detalles.forEach(d => {

      //Asigna el Id de la factura
      d.value.IdFactura = factura.IdFactura;

      factura.DetallesFactura.push(d.value);
    });

    console.log("Factura", factura);

    //Crear
    if(this.facturaForm.controls["IdFactura"].value == 0)
    {
      this.facturasService.postFactura(this.facturaForm.value).subscribe(data => {
        
        this.mostrarToast("creada");

        //Retorna a la vista de facturas
        this.router.navigate(['/facturas']);
      }, error => {
        console.log("Error", error);
      });
    }
    //Editar
    else {
      
      this.facturasService.putFactura(this.facturaForm.controls["IdFactura"].value, this.facturaForm.value).subscribe(data => {
        
        this.mostrarToast("editada");

        //Retorna a la vista de facturas
        this.router.navigate(['/facturas']);
      }, error => {
        console.log("Error", error);
      });
    }
  }

  /**
   * Establece el modo de configuracion del componente : [edicion, creacion] 
   * @param id 
   */
  establecerModo(idFactura: number):Modos{

    if(idFactura === 0)
      return Modos.creacion
    else 
      return Modos.edicion 
  }

  /** 
   * Elimina el factura actual
  */
  eliminarFactura(): void{
    this.facturasService.deleteFactura(this.facturaForm.controls["IdFactura"].value).subscribe(data => {
      //Retorna a la vista de facturas
      this.router.navigate(['/facturas']);

    }, error => console.log(error));
  }

  eliminarDetalleFactura(d : FormGroup): void{
    this.detalles = this.detalles.filter(_d => _d != d);
  }

  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el factura?',
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
            this.eliminarFactura();
            this.mostrarToast("eliminada");
          }
        }
      ]
    });

    await alert.present();
  }

  
  /**
   * Verifica que el usuario este seguro de eliminar un registro
   */
  async confirmarEliminacionDetalle(d :FormGroup) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: '¿Está seguro de eliminar el detalle de factura?',
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
            this.eliminarDetalleFactura(d);
            //this.mostrarToast("eliminada");
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
      message: 'La factura ' + (this.facturaForm.controls["IdFactura"].value == 0 ? "" : this.facturaForm.controls["IdFactura"].value)+ " ha sido "+ accion +" correctamente",
      duration: 2000
    });
    toast.present();
  }

  /**Crea un formulario de detalle de factura */
  onAgregarDetalle(d: DetalleFactura = null){

    //Formulario base de un detalle de factura
    let facturaDetalleFormBase = new FormGroup({
      Importe             : new FormControl(d?.Importe ?? null          ,[Validators.required, Validators.maxLength(50),Validators.pattern("^[0-9]*$")]),
      Plato               : new FormControl(d?.Plato ?? null            ,[Validators.required, Validators.maxLength(500)]),
      IdCocinero          : new FormControl(d?.IdCocinero ?? null          ,[Validators.required]),   
      IdFactura           : new FormControl(d?.IdFactura ?? 0),
      IdDetalleFactura    : new FormControl(d?.IdDetalleFactura ?? 0)   
    });


    this.detalles.push(facturaDetalleFormBase);
  }


  /**Valida cada formulario de factura y factura detalle */
  validarForms():boolean{
 
    if(this.detalles.filter(d => d.invalid).length > 0)
        return false;
    else if(this.facturaForm.invalid)
        return false;
    
    return true;

  }

}
