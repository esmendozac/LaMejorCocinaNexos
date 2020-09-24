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
    public class FacturasController : ApiController
    {
        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();

         // GET: api/Facturas
        public IQueryable<Factura> GetFacturas()
        {
            return db.Facturas.OrderByDescending(f => f.Fecha);
        }

        // GET: api/Facturas/5
        [ResponseType(typeof(Factura))]
        public IHttpActionResult GetFactura(int id)
        {
            Factura factura = db.Facturas.Find(id);
            if (factura == null)
            {
                return NotFound();
            }

            return Ok(factura);
        }

        // PUT: api/Facturas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFactura(int id, Factura factura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != factura.IdFactura)
            {
                return BadRequest();
            }


            //Consulta los existentes
            DetalleFactura[] detallesExistentes = db.DetallesFactura.Where(d => d.IdFactura == id).ToArray();
            //Extrae los que vienen en el request
            DetalleFactura[] detallesActualizar = factura.DetallesFactura.ToArray();

            //Crear: 
            db.DetallesFactura.AddRange(detallesActualizar.Where(d => d.IdDetalleFactura == 0));

            detallesActualizar = detallesActualizar.Where(d => d.IdDetalleFactura != 0).ToArray();
                               
            //Actualizar: Existen en ambas colecciones 
            foreach (var detalle in detallesExistentes)
            {
                //Si está en los existentes actualiza, de lo contrario elimina
                DetalleFactura detalleActualizar = detallesActualizar.Where(d => d.IdDetalleFactura == detalle.IdDetalleFactura).FirstOrDefault();

                //Actualiza campos
                if (detalleActualizar != null)
                {
                    detalle.Importe = detalleActualizar.Importe;
                    detalle.Plato = detalleActualizar.Plato;
                    detalle.IdCocinero = detalleActualizar.IdCocinero;
                }
                //Elimina campos
                else
                    db.DetallesFactura.Remove(detalle);
            }

            factura.DetallesFactura = null;

            db.Entry(factura).State = EntityState.Modified;

            try
            {
                db.SaveChanges();

                //Calcula el total de la factura
                string total = CalcularTotalFactura(id).ToString();

                Factura facturaTotal = db.Facturas.Where(f => f.IdFactura == id).FirstOrDefault();

                if (facturaTotal != null)
                {
                    facturaTotal.Total = total;
                    db.SaveChanges();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

           


            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Facturas
        [ResponseType(typeof(Factura))]
        public IHttpActionResult PostFactura(Factura factura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Facturas.Add(factura);
            db.SaveChanges();

            //Calcula el total de la factura
            string total = CalcularTotalFactura(factura.IdFactura).ToString();

            Factura facturaTotal = db.Facturas.Where(f => f.IdFactura == factura.IdFactura).FirstOrDefault();

            if (facturaTotal != null)
            {
                facturaTotal.Total = total;
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = factura.IdFactura }, factura);
        }

        // DELETE: api/Facturas/5
        [ResponseType(typeof(Factura))]
        public IHttpActionResult DeleteFactura(int id)
        {
            Factura factura = db.Facturas.Find(id);
            if (factura == null)
            {
                return NotFound();
            }

            db.Facturas.Remove(factura);
            db.SaveChanges();

            return Ok(factura);
        }


        /// <summary>
        /// Calcula el precio de una factura 
        /// </summary>
        /// <returns></returns>
        public int CalcularTotalFactura(int idFactura)
        {
            //Extrae los importes de factura 
            string[] importes = db.DetallesFactura.Where(d => d.IdFactura == idFactura).Select(d => d.Importe).ToArray();

            int total = 0;

            //Los convierte a numero para realizar operaciones
            foreach (var i in importes)
            {

                if (!Int32.TryParse(i, out int importe))
                    importe = 0;

                total += importe;
            }

            return total;
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FacturaExists(int id)
        {
            return db.Facturas.Count(e => e.IdFactura == id) > 0;
        }
    }
}