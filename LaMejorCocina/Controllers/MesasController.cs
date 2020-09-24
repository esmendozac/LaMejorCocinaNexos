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
    public class MesasController : ApiController
    {
        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();

        // GET: api/Mesas
        public IQueryable<Mesa> GetMesas()
        {
            return db.Mesas;
        }

        // GET: api/Mesas/5
        [ResponseType(typeof(Mesa))]
        public IHttpActionResult GetMesa(int id)
        {
            Mesa mesa = db.Mesas.Find(id);
            if (mesa == null)
            {
                return NotFound();
            }

            return Ok(mesa);
        }

        // PUT: api/Mesas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMesa(int id, Mesa mesa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mesa.IdMesa)
            {
                return BadRequest();
            }

            db.Entry(mesa).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MesaExists(id))
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

        // POST: api/Mesas
        [ResponseType(typeof(Mesa))]
        public IHttpActionResult PostMesa(Mesa mesa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Mesas.Add(mesa);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = mesa.IdMesa }, mesa);
        }

        // DELETE: api/Mesas/5
        [ResponseType(typeof(Mesa))]
        public IHttpActionResult DeleteMesa(int id)
        {
            Mesa mesa = db.Mesas.Find(id);
            if (mesa == null)
            {
                return NotFound();
            }

            db.Mesas.Remove(mesa);
            db.SaveChanges();

            return Ok(mesa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MesaExists(int id)
        {
            return db.Mesas.Count(e => e.IdMesa == id) > 0;
        }
    }
}