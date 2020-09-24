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
    public class CamarerosController : ApiController
    {
        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();

        // GET: api/Camareros
        public IQueryable<Camarero> GetCamareros()
        {
            return db.Camareros;
        }

        // GET: api/Camareros/5
        [ResponseType(typeof(Camarero))]
        public IHttpActionResult GetCamarero(int id)
        {
            Camarero camarero = db.Camareros.Find(id);
            if (camarero == null)
            {
                return NotFound();
            }

            return Ok(camarero);
        }

        // PUT: api/Camareros/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCamarero(int id, Camarero camarero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != camarero.IdCamarero)
            {
                return BadRequest();
            }

            db.Entry(camarero).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CamareroExists(id))
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

        // POST: api/Camareros
        [ResponseType(typeof(Camarero))]
        public IHttpActionResult PostCamarero(Camarero camarero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Camareros.Add(camarero);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = camarero.IdCamarero }, camarero);
        }

        // DELETE: api/Camareros/5
        [ResponseType(typeof(Camarero))]
        public IHttpActionResult DeleteCamarero(int id)
        {
            Camarero camarero = db.Camareros.Find(id);
            if (camarero == null)
            {
                return NotFound();
            }

            db.Camareros.Remove(camarero);
            db.SaveChanges();

            return Ok(camarero);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CamareroExists(int id)
        {
            return db.Camareros.Count(e => e.IdCamarero == id) > 0;
        }
    }
}