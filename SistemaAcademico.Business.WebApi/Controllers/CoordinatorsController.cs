using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SistemaAcademico.Business.WebApi.Controllers
{
    [RoutePrefix("api/coordinators")]
    [Authorize]
    public class CoordinatorsController : ApiController
    {
        private ApplicationDbContext _db;
        public CoordinatorsController(ApplicationDbContext db)
        {
            this._db = db;
        }

        [HttpGet]
        [Route("info")]
        public IHttpActionResult GetInfo(string userName)
        {
            var coordinator = _db.Coordinators
                                .Where(x => x.UserName == userName)
                                .Select(x => new
                                {
                                    Courses = x.Courses.Select(y => new { Course = y.Name, Id = y.Id }).ToList()
                                })
                                .FirstOrDefault();

            if (coordinator != null)
                return Ok(coordinator);

            return NotFound();
        }


        [HttpGet]
        [Route("info-by-course")]
        public IHttpActionResult GetInfo(string userName, int courseId)
        {
            var coordinator = _db.Coordinators
                                .Where(x => x.UserName == userName)
                                .Select(x => new
                                {
                                    Course = x.Courses
                                                .Where(y => y.Id == courseId)
                                                .Select(y => new
                                                {
                                                    Name = y.Name,
                                                    Id = y.Id,
                                                    Students = y.Students.Select(z => new
                                                    {
                                                        Name = z.UserName,
                                                        AmountSubject = z.SchoolClasses.Count
                                                    })
                                                    .ToList()
                                                })
                                                .FirstOrDefault()
                                })
                                .FirstOrDefault();

            if (coordinator != null)
                return Ok(coordinator);

            return NotFound();
        }
    }
}
