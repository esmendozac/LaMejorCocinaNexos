using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LaMejorCocina.ObjetosNegocio;
using LaMejorCocina.ObjetosNegocio.Dto;

namespace LaMejorCocina.Controllers
{
    public class ReportesController : ApiController
    {

        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();


        [Route("api/Reportes/Clientes")]
        public ClienteDto[] GetReporteClientes()
        {
            db.Configuration.LazyLoadingEnabled = false;

            IQueryable<Factura> facturas = db.Facturas.Include("Cliente");

            //Agrupa las facturas por cliente
            var clientesFacturas = facturas.GroupBy(f => f.Cliente).ToArray();

            List<ClienteDto> clientesDto = new List<ClienteDto>();

            //Itera por cada cliente
            foreach (var cf in clientesFacturas)
            {
                int total = 0;

                //Suma el total de lo gastado por cliente
                foreach (var f in cf)
                {
                    if (!Int32.TryParse(f.Total, out int valorFactura))
                        valorFactura = 0;

                    total += valorFactura;
                }

                //El cliente es válido para el reporte
                if (total > 100000)
                {
                    clientesDto.Add(new ClienteDto()
                    {
                        Nombres = cf.Key.Nombres,
                        Apellido1 = cf.Key.Apellido1,
                        Apellido2 = cf.Key.Apellido2,
                        Observaciones = cf.Key.Observaciones,
                        Gasto = total.ToString()
                    });
                }
            }

            return clientesDto.ToArray();
        }


        [Route("api/Reportes/Camareros")]
        public MesDto[] GetReporteCamareros()
        {
            //Deshabilita la carga perezoza
            db.Configuration.LazyLoadingEnabled = false;

            //Consulta todos los camareros con sus facturas
            IQueryable<Camarero> camareros = db.Camareros;

            //Consulta todas las facturas y las agrupa por mes y año
            var facturasMesesCamarero = db.Facturas.Where(f => f.Total != null)
                                      .Select(f => new { f.Fecha, f.IdCamarero, f.Total })
                                      .GroupBy(f => new { f.Fecha.Year, f.Fecha.Month }).ToArray();

            //Mapea TODOS los camareros en el dto
            CamareroDto[] camarerosDto = camareros.Select(c => new CamareroDto()
            {
                Nombres = c.Nombres,
                Apellidos1 = c.Apellido1,
                Apellidos2 = c.Apellido2,
                IdCamarero = c.IdCamarero,
                Facturado = ""
            }).ToArray();

            //Almacena los meses para retornar la consulta
            List<MesDto> meses = new List<MesDto>();

            foreach (var fmc in facturasMesesCamarero)
            {
                //Arma el mes
                MesDto mes = new MesDto()
                {
                    Numero = fmc.Key.Month,
                    Nombre = GetMesTexto(fmc.Key.Month),
                    Anio = fmc.Key.Year.ToString(),
                    Camareros = new List<CamareroDto>()
                };

                //Busca las facturas de cada camarero y calcula el total 
                foreach (var cam in camarerosDto)
                {
                    //Busca las facturas de este mes para este camarero
                    var facturasCamarero = fmc.Where(f => f.IdCamarero == cam.IdCamarero).ToArray();

                    int total = 0;

                    //Realiza la cuenta del total de la facturación por mes año 
                    foreach (var fac in facturasCamarero)
                    {
                        if (!Int32.TryParse(fac.Total, out int valorFactura))
                            valorFactura = 0;

                        total += valorFactura;
                    }

                    //Añade el camarero a los meses
                    mes.Camareros.Add(new CamareroDto()
                    {
                        Nombres = cam.Nombres,
                        Apellidos1 = cam.Apellidos1,
                        Apellidos2 = cam.Apellidos2,
                        IdCamarero = cam.IdCamarero,
                        Facturado = total.ToString()
                    });
                }

                meses.Add(mes);
            }

            return meses.OrderBy(m => m.Anio).ThenByDescending(m => m.Numero).ToArray();
        }
        
        public string GetMesTexto(int mes)
        {
            if (mes == 1)
                return "Enero";
            else if (mes == 2)
                return "Febrero";
            else if (mes == 3)
                return "Marzo";
            else if (mes == 4)
                return "Abril";
            else if (mes == 5)
                return "Mayo";
            else if (mes == 6)
                return "Junio";
            else if (mes == 7)
                return "Julio";
            else if (mes == 8)
                return "Agosto";
            else if (mes == 9)
                return "Septiembre";
            else if (mes == 10)
                return "Octubre";
            else if (mes == 11)
                return "Noviembre";
            else if (mes == 12)
                return "Diciembre";
            else
                return "";
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
