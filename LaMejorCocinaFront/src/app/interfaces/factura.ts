import { Cliente } from './cliente';
import { DetalleFactura } from './detalle-factura';

export interface Factura {
    IdFactura       : number;
    IdCliente       : number;
    IdCamarero      : number;
    IdMesa          : number;
    Fecha           : Date;
    DetallesFactura : DetalleFactura[];
    Cliente         : Cliente;
    Total           : string;
}
