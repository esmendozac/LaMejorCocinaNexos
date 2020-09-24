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

namespace LaMejorCocina.Controllers
{
    public class DetallesFacturaController : ApiController
    {
        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();

        // GET: api/DetallesFactura
        public IQueryable<DetalleFactura> GetDetallesFactura()
        {
            return db.DetallesFactura;
        }

        // GET: api/DetallesFactura/5
        [ResponseType(typeof(DetalleFactura))]
        public IHttpActionResult GetDetalleFactura(int id)
        {
            DetalleFactura detalleFactura = db.DetallesFactura.Find(id);
            if (detalleFactura == null)
            {
                return NotFound();
            }

            return Ok(detalleFactura);
        }

        // PUT: api/DetallesFactura/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetalleFactura(int id, DetalleFactura detalleFactura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detalleFactura.IdDetalleFactura)
            {
                return BadRequest();
            }

            db.Entry(detalleFactura).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleFacturaExists(id))
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

        // POST: api/DetallesFactura
        [ResponseType(typeof(DetalleFactura))]
        public IHttpActionResult PostDetalleFactura(DetalleFactura detalleFactura)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DetallesFactura.Add(detalleFactura);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = detalleFactura.IdDetalleFactura }, detalleFactura);
        }

        // DELETE: api/DetallesFactura/5
        [ResponseType(typeof(DetalleFactura))]
        public IHttpActionResult DeleteDetalleFactura(int id)
        {
            DetalleFactura detalleFactura = db.DetallesFactura.Find(id);
            if (detalleFactura == null)
            {
                return NotFound();
            }

            db.DetallesFactura.Remove(detalleFactura);
            db.SaveChanges();

            return Ok(detalleFactura);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DetalleFacturaExists(int id)
        {
            return db.DetallesFactura.Count(e => e.IdDetalleFactura == id) > 0;
        }
    }
}