using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaMejorCocina.ObjetosNegocio.Dto
{
    public class MesDto
    {
        public string Nombre { get; set; }
        public string Anio { get; set; }
        public int Numero { get; set; }
        public List<CamareroDto> Camareros { get; set; }
    }
}