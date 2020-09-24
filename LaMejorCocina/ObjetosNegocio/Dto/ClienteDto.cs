using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaMejorCocina.ObjetosNegocio.Dto
{
    public class ClienteDto
    {
        public string Nombres { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public string Observaciones { get; set; }
        public string Gasto { get; set; }
    }
}