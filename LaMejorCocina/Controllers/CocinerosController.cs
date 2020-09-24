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
    public class CocinerosController : ApiController
    {
        private LaMejorCocinaEntities db = new LaMejorCocinaEntities();

        // GET: api/Cocineros
        public IQueryable<Cocinero> GetCocineros()
        {
            return db.Cocineros;
        }

        // GET: api/Cocineros/5
        [ResponseType(typeof(Cocinero))]
        public IHttpActionResult GetCocinero(int id)
        {
            Cocinero cocinero = db.Cocineros.Find(id);
            if (cocinero == null)
            {
                return NotFound();
            }

            return Ok(cocinero);
        }

        // PUT: api/Cocineros/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCocinero(int id, Cocinero cocinero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cocinero.IdCocinero)
            {
                return BadRequest();
            }

            db.Entry(cocinero).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CocineroExists(id))
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

        // POST: api/Cocineros
        [ResponseType(typeof(Cocinero))]
        public IHttpActionResult PostCocinero(Cocinero cocinero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cocineros.Add(cocinero);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cocinero.IdCocinero }, cocinero);
        }

        // DELETE: api/Cocineros/5
        [ResponseType(typeof(Cocinero))]
        public IHttpActionResult DeleteCocinero(int id)
        {
            Cocinero cocinero = db.Cocineros.Find(id);
            if (cocinero == null)
            {
                return NotFound();
            }

            db.Cocineros.Remove(cocinero);
            db.SaveChanges();

            return Ok(cocinero);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CocineroExists(int id)
        {
            return db.Cocineros.Count(e => e.IdCocinero == id) > 0;
        }
    }
}