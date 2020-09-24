import { CamareroDto } from './camarero-dto';

export interface MesDto {
    Nombre    : string,
    Anio      : string,
    Numero    : number,
    Camareros : CamareroDto[]
}
