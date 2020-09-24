using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaMejorCocina.ObjetosNegocio.Dto
{
    public class CamareroDto
    {
        public int IdCamarero { get; set; }
        public string Nombres { get; set; }
        public string Apellidos1 { get; set; }
        public string Apellidos2 { get; set; }
        public string Facturado { get; set; }
    }
}