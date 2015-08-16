using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SistemaAcademico.Business.WebApi.Controllers
{
    [RoutePrefix("api/secretaries")]
    public class SecretariesController : ApiController
    {
        private ApplicationDbContext _db;
        public SecretariesController(ApplicationDbContext db)
        {
            this._db = db;
        }

        [HttpGet]
        [Route("get-all-students")]
        public IHttpActionResult GetAllStudents()
        {
            var students = _db.Students
                                .Select(x => new
                                {
                                    UserName = x.UserName,
                                    Email = x.Email,
                                    Course = x.Course.Name,
                                    AmountSubject = x.SchoolClasses.Count
                                }).ToList();

            if (students != null)
                return Ok(students);

            return NotFound();
        }
    }
}
